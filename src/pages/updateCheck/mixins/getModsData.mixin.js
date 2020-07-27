/* eslint-disable brace-style */


import getGitHubFile from '../../../tools/getGitHubFile';
import ajax from '../../../lib/ajax';
import delay from '../../../tools/delay';


export default {
  methods: {

    /** 获取整合包模组数据 */
    async getModsData() {
      let readmeContent;

      // 读取 README.md 文件内容, 获取模组基本信息
      try {
        readmeContent = await getGitHubFile('/README.md');
        this.stateError = null;
        this.state = 1;
      } catch (error) {
        this.stateError = error;
        this.state = 2;
      }

      // 如果获取 README.md 文件成功, 那么就解析其内容然后对模组其余相关信息进行获取
      if (this.state === 1) {
        // 显示第一个 Tab 页
        this.tabsActiveKey = this.modpackTypeList[0].key;
        // 解析 README.md 文件
        this.modpackData = this.analysisModsData(readmeContent);
        // 读取模组列表, 获取模组其余相关信息
        getGitHubFile('/Minecraft Origin/.minecraft/mods')
          .then((files) => {
            this.analysisModsFileInfo(files);
            this.watchTabsToGetModsUpdateData();
          })
          .catch((error) => {
            [].concat(...Object.values(this.modpackData)).forEach((mod) => {
              this.$set(mod, 'nameGetState', 2);
            });
          });
      }
    },

    /**
     * 监听标签页的切换,
     * 当标签页切换后, 获取当前标签页模组的最新版本模组数据
     */
    watchTabsToGetModsUpdateData() {
      // 监听标签页切换
      const tabsVm = this.$refs.tabs;
      tabsVm.$on('change', this.getModsUpdateData);
      // 立即触发当前标签页的模组的最新版本模组数据获取
      this.getModsUpdateData();
    },

    /** 获取整合包模组最新版本模组数据 */
    async getModsUpdateData() {
      /** 所有主页为 curseforge 模组的模组信息 */
      const modsData = this.modpackData[this.tabsActiveKey].filter(({ nameGetState, file, href, updateFile }) => {
        return nameGetState === 1 && file && href && href.startsWith('https://www.curseforge.com/') && !updateFile;
      });

      for (const mod of modsData) {
        try {
          const { files: modFiles, versions: modVersions } = await this.getModUpdateData(mod.href); // eslint-disable-line no-await-in-loop
          const updateFileData = this.findUpdateFileData(modFiles, modVersions, '1.12.2');

          if (updateFileData) {
            this.$set(mod, 'updateFile', updateFileData.name);
          } else {
            console.error(`[ ${mod.title} - ${mod.subTitle} ] 模组未检测到对应版本: ${mod.href} ${mod.href.replace('www.curseforge.com', 'api.cfwidget.com')}\n`);
          }
        } catch (error) {
          console.error(`[ ${mod.title} - ${mod.subTitle} ] 模组检测更新失败: ${mod.href} ${mod.href.replace('www.curseforge.com', 'api.cfwidget.com')}\n`, error);
        }
      }
    },

    /**
     * 获取单个模组信息
     * @param {string} href 模组主页
     */
    async getModUpdateData(href) {
      const checkHref = href.replace('www.curseforge.com', 'api.cfwidget.com');
      const modInfo = await ajax(checkHref);

      if (modInfo.error === 'in_queue') {
        await delay(1000);
        return this.getModUpdateData(href);
      }
      return modInfo;
    },

    /**
     * 从模组信息中查找传入模组的最新版本
     * @param {array} modFiles 模组信息 files 数组
     * @param {{}} modVersions 模组信息 versions 数组
     * @param {string} version 需要查找的游戏版本号
     */
    findUpdateFileData(modFiles, modVersions, version) {
      let updateFileData;

      // 过滤游戏版本号
      modFiles = modFiles.filter(({ versions }) => versions.includes(version));
      modVersions = modVersions[version];

      // 如果在 files 数组中找到了对应游戏版本号的模组
      // 则按照时间排序并取出最新的一个
      if (modFiles.length) {
        [updateFileData] = modFiles.sort((a, b) => {
          return (new Date(b.uploaded_at)) - (new Date(a.uploaded_at));
        });
      }
      // 在 versions 数组中继续查找
      else if (modVersions && modVersions.length) {
        [updateFileData] = modVersions.sort((a, b) => {
          return (new Date(b.uploaded_at)) - (new Date(a.uploaded_at));
        });
      }

      return updateFileData;
    }

  }
};
