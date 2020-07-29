/**
 * mod.getModFilenameState: 当前模组的加载文件名状态
 *   case 1:  加载完成
 *   case 2:  加载失败
 *   default: 加载中
 *
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
     * 渲染表格中 "文件名及版本" 列内容
     * @param {string} getModFilenameState 当前模组的加载文件名状态
     * @param {{}} mod 当前模组数据对象
     */
    renderTableFilename(getModFilenameState, mod) {
      const h = this.$createElement;

      switch (getModFilenameState) {
        case 1: return h('div', null, mod.filename);
        case 2: return h('a-icon', {
          attrs: { type: 'warning', title: '文件名及版本加载失败' }
        });
        default: return h('a-spin', {
          attrs: { size: 'small', title: '文件名及版本加载中' }
        });
      }
    },

    /**
     * 渲染表格中 "检测更新" 的按钮
     * @param {number} checkModUpdateState 当前模组的检测更新状态
     * @param {{}} mod 当前模组数据对象
     */
    renderTableUpdateCheckButton(checkModUpdateState, mod) {
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
    }

  }
};