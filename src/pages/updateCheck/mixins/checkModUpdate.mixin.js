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

  methods: {

    /**
     * 渲染表格中 "检测更新" 的按钮
     * @param {*} checkModUpdateState 当前模组的检测更新状态
     * @param {*} mod 当前模组数据对象
     */
    renderUpdateCheckButton(checkModUpdateState, mod) {
      // 只能检测来源为 curseforge 的模组
      if (mod.href.startsWith('https://www.curseforge.com/') === false) return;

      const type = 'primary';
      let icon = '';
      let disabled = true;

      // 文件名及版本字段还在加载中时, 此时不允许检测更新
      if (mod.filename) {
        switch (checkModUpdateState) {
          case 1: icon = 'check-circle'; break;
          case 2: icon = 'info-circle'; break;
          case 3: icon = 'loading'; break;
          case 4: icon = 'stop'; disabled = false; break;
          case 5: icon = 'exclamation-circle'; disabled = false; break;
          default: disabled = false; icon = 'redo';
        }
      }

      return this.$createElement('a-button', {
        attrs: {
          shape: 'round',
          type,
          icon,
          disabled
        },
        on: {
          click: () => {
            this.$set(mod, 'checkModUpdateState', 3);
            this.checkModUpdate(mod);
          }
        }
      }, mod.filename ? '' : '...');
    },

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
        this.$notification.error({ key: mod.filename, message: `${mod.title} - ${mod.subTitle}`, description: '模组检测更新失败' });
        console.error(`[ ${mod.title} - ${mod.subTitle} ] 模组检测更新失败: ${mod.href} ${mod.href.replace('www.curseforge.com', 'api.cfwidget.com')}\n`, error);
      }

      if (modLatestInfo) {
        const modFiles = modLatestInfo.files.filter(({ versions }) => versions.includes('1.12.2'));
        const modVersions = modLatestInfo.versions['1.12.2'];
        let modLatestData;

        // 如果在 files 数组中找到了对应游戏版本号的模组
        // 则按照时间排序并取出最新的一个
        if (modFiles.length) {
          [modLatestData] = modFiles.sort((a, b) => {
            return (new Date(b.uploaded_at)) - (new Date(a.uploaded_at));
          });
        }
        // 在 versions 数组中继续查找
        else if (modVersions && modVersions.length) {
          [modLatestData] = modVersions.sort((a, b) => {
            return (new Date(b.uploaded_at)) - (new Date(a.uploaded_at));
          });
        }

        // 找到了最新的模组信息
        if (modLatestData) {
          this.$set(mod, 'checkModUpdateState', modLatestData.name === mod.filename ? 1 : 2);
          this.$set(mod, 'updateFile', modLatestData.name);
        } else {
          this.$set(mod, 'checkModUpdateState', 5);
          this.$notification.error({ key: mod.filename, message: `${mod.title} - ${mod.subTitle}`, description: '模组未检测到对应版本' });
          console.error(`[ ${mod.title} - ${mod.subTitle} ] 模组未检测到对应版本: ${mod.href} ${mod.href.replace('www.curseforge.com', 'api.cfwidget.com')}\n`);
        }
      }
    }

  }
};
