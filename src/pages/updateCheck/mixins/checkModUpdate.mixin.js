/* eslint-disable brace-style */


import dayjs from 'dayjs';
import getModLatestInfo from '../util/getModLatestInfo';


/**
 * mod.checkModUpdateState: 当前模组的检测更新状态
 *   case 1: 当前模组已经是最新的了
 *   case 2: 当前模组有更新
 *   case 3: 正在等待检测更新
 *   case 4: 正在检测更新
 *   case 5: 检测更新失败
 *   case 6: 未检测到对应版本
 *   default: 无状态
 */


export default {
  data: () => ({
    /** 检测更新时, 需要查找的版本 */
    __checkVersions: ['1.12.2', '1.12']
  }),
  methods: {

    /**
     * 检测单个模组更新
     * @param {{}} mod 模组数据
     */
    async checkModUpdate(mod) {
      // 只能检测来源为 curseforge 的模组
      if (mod.href.startsWith('https://www.curseforge.com/') === false) return;
      // 正在检测和已经检测完成的模组无需再次检测
      if ([1, 2, 4].includes(mod.checkModUpdateState)) return;

      let modLatestInfo;

      // 标记正在检测中
      this.$set(mod, 'checkModUpdateState', 4);

      try {
        modLatestInfo = await getModLatestInfo(mod.href);
      } catch (error) {
        this.$set(mod, 'checkModUpdateState', 5);
        this.$notification.error({ key: mod.filename, message: `${mod.name} - ${mod.subName}`, description: '模组检测更新失败' });
        console.error(`[ ${mod.name} - ${mod.subName} ] 模组检测更新失败: ${mod.href} ${mod.href.replace('www.curseforge.com', 'api.cfwidget.com')}\n`, error);
      }

      if (modLatestInfo) {
        let modFiles;
        let modVersions;
        let modLatestData;

        for (const checkVersion of this.$data.__checkVersions) {
          modFiles = modLatestInfo.files.filter(({ versions }) => versions.includes(checkVersion));
          modVersions = modLatestInfo.versions[checkVersion];

          // 如果在 files 数组中找到了对应游戏版本号的模组
          // 则按照时间排序并取出最新的一个
          if (modFiles.length) {
            [modLatestData] = modFiles.sort((a, b) => {
              return (new Date(b.uploaded_at)) - (new Date(a.uploaded_at));
            });
            break;
          }
          // 在 versions 数组中继续查找
          else if (modVersions && modVersions.length) {
            [modLatestData] = modVersions.sort((a, b) => {
              return (new Date(b.uploaded_at)) - (new Date(a.uploaded_at));
            });
            break;
          }
        }

        // 找到了最新的模组信息
        if (modLatestData) {
          this.$set(mod, 'checkModUpdateState', modLatestData.name === mod.filename ? 1 : 2);
          this.$set(mod, 'updateFilename', modLatestData.name);
          this.$set(mod, 'updateFilenameUploadedDate', dayjs(modLatestData.uploaded_at).format('YYYY-MM-DD HH:mm:ss Z'));
          this.$set(mod, 'updateFilenameChangelogUrl', modLatestData.url);
          this.$set(mod, 'updateFilenameDownloadUrl', modLatestData.url.replace('/files/', '/download/'));
        } else {
          this.$set(mod, 'checkModUpdateState', 6);
          this.$notification.error({ key: mod.filename, message: `${mod.name} - ${mod.subName}`, description: '模组未检测到对应版本' });
          console.error(`[ ${mod.name} - ${mod.subName} ] 模组未检测到对应版本: ${mod.href} ${mod.href.replace('www.curseforge.com', 'api.cfwidget.com')}\n`);
        }
      }
    },

    /**
     * 检测当前标签页的模组更新
     */
    async checkModsUpdateByActiveTab() {
      const modsData = this.modpackData[this.tabsActiveKey].filter((mod) => {
        // 只能检测来源为 curseforge 的模组
        return mod.href.startsWith('https://www.curseforge.com/');
      });

      // 所有模组标记正在等待检测
      modsData.forEach((mod) => {
        this.$set(mod, 'checkModUpdateState', 3);
      });

      for (const mod of modsData) {
        // eslint-disable-next-line no-await-in-loop
        await this.checkModUpdate(mod);
      }
    }

  }
};
