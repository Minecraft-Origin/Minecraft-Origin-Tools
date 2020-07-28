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
    }

  }
};
