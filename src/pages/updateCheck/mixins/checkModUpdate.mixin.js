/* eslint-disable brace-style */


import getModLatestInfo from '../util/getModLatestInfo';


/**
 * mod.checkModUpdateState: 当前模组的检测更新状态
 *   case 1: 当前模组已经是最新的了
 *   case 2: 当前模组有更新
 *   case 3: 正在检测更新
 *   case 4: 检测更新失败
 *   case 5: 未检测到对应版本
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
      let modLatestInfo;

      try {
        modLatestInfo = await getModLatestInfo(mod.href);
      } catch (error) {
        this.$set(mod, 'checkModUpdateState', 4);
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
        } else {
          this.$set(mod, 'checkModUpdateState', 5);
          this.$notification.error({ key: mod.filename, message: `${mod.name} - ${mod.subName}`, description: '模组未检测到对应版本' });
          console.error(`[ ${mod.name} - ${mod.subName} ] 模组未检测到对应版本: ${mod.href} ${mod.href.replace('www.curseforge.com', 'api.cfwidget.com')}\n`);
        }
      }
    }

  }
};
