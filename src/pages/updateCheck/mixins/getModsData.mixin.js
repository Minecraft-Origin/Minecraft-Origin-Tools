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
          const modInfo = await this.getModUpdateData(mod.href); // eslint-disable-line no-await-in-loop
          const modVersions = modInfo.versions;

          if (modVersions['1.12.2']) {
            this.$set(mod, 'updateFile', modVersions['1.12.2'].slice(-1)[0].name);
          }
        } catch (error) {
          console.error(`[ ${mod.title} - ${mod.subTitle} ] 模组检测更新失败: ${mod.href}, ${mod.href.replace('www.curseforge.com', 'api.cfwidget.com')}\n`, error);
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
    }


  }
};
