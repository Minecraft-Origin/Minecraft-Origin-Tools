import Clipboard from 'clipboard';

/**
 * mod.getModFilenameState: 当前模组的加载文件名状态
 *   case 1:  加载完成
 *   case 2:  加载失败
 *   default: 加载中
 *
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
  methods: {

    /**
     * 渲染表格中 "名称" 列内容
     * @param {string} name 模组名称
     * @param {{}} mod 当前模组数据对象
     */
    renderTableNameColumn(name, { subName }) {
      return [
        name,
        subName && !name.includes(subName) && ` - ${subName}`
      ];
    },

    /**
     * 渲染表格中 "文件名及版本" 列内容
     * @param {number} getModFilenameState 当前模组的加载文件名状态
     * @param {{}} mod 当前模组数据对象
     */
    renderTableFilenameColumn(getModFilenameState, mod) {
      const h = this.$createElement;

      switch (getModFilenameState) {
        case 1: {
          const checkModUpdateState = mod.checkModUpdateState;
          let extraResult;

          // 当前模组有更新, 需要额外显示一些内容
          if (checkModUpdateState === 2) {
            extraResult = h('a-popover', {
              attrs: { placement: 'right' }
            }, [
              // 显示内容
              h('span', { staticClass: 'update-check-table-update-filename' }, [
                mod.updateFilename,
                h('a-icon', {
                  attrs: { type: 'select' }
                })
              ]),
              // 弹窗标题
              h('b', { slot: 'title' }, '模组更新信息'),
              // 弹窗内容
              h('div', { slot: 'content' }, [
                h('div', null, [
                  h('b', null, '发布时间: '),
                  h('span', null, mod.updateFilenameUploadedDate)
                ]),
                h('div', null, [
                  h('b', null, '更新日志: '),
                  h('safe-a', { attrs: { href: mod.updateFilenameChangelogUrl } })
                ]),
                h('div', null, [
                  h('b', null, '下载地址: '),
                  h('safe-a', { attrs: { href: mod.updateFilenameDownloadUrl } })
                ]),
                h('div', null, [
                  h('b', null, '更新后的模组名称: '),
                  h('span', {
                    staticClass: 'color-primary cursor-pointer',
                    attrs: { 'data-clipboard-text': mod.updateFilenameDownloadFilename, 'title': '点击复制 ~' },
                    on: { click: this.copyInnerHTML }
                  }, mod.updateFilenameDownloadFilename)
                ])
              ])
            ]);
          }

          return [
            h('div', { staticClass: checkModUpdateState === 1 ? 'color-success' : '' }, [
              h('span', null, mod.filename)
            ]),
            extraResult
          ];
        }
        case 2: return h('a-icon', {
          attrs: { type: 'warning', title: '文件名及版本加载失败' }
        });
        default: return h('a-spin', {
          attrs: { size: 'small', title: '文件名及版本加载中' }
        });
      }
    },

    /**
     * 渲染表格中 "检测更新" 列内容
     * @param {number} checkModUpdateState 当前模组的检测更新状态
     * @param {{}} mod 当前模组数据对象
     */
    renderTableUpdateCheckColumn(checkModUpdateState, mod) {
      // 只能检测来源为 curseforge 的模组
      if (mod.href.startsWith('https://www.curseforge.com/') === false) return;

      return this.$createElement('a-tooltip', {
        attrs: { placement: 'right' }
      }, [
        this.renderTableUpdateCheckColumnButton(checkModUpdateState, mod),
        this.renderTableUpdateCheckColumnTooltipTitle(checkModUpdateState, mod)
      ]);
    },

    /**
     * 渲染表格中 "检测更新" 列内容的按钮
     * @param {number} checkModUpdateState 当前模组的检测更新状态
     * @param {{}} mod 当前模组数据对象
     */
    renderTableUpdateCheckColumnButton(checkModUpdateState, mod) {
      let icon = 'dash';
      let disabled = true;

      // 文件名及版本字段还在加载中时, 此时不允许检测更新
      if (mod.filename) {
        switch (checkModUpdateState) {
          case 1: icon = 'check-circle'; break;
          case 2: icon = 'info-circle'; break;
          case 3: icon = 'pause-circle'; break;
          case 4: icon = 'loading'; break;
          case 5: icon = 'stop'; disabled = false; break;
          case 6: icon = 'exclamation-circle'; disabled = false; break;
          default: disabled = false; icon = 'redo';
        }
      }

      return this.$createElement('a-button', {
        attrs: { shape: 'round', type: 'primary', icon, disabled },
        on: {
          click: () => {
            this.checkModUpdate(mod);
          }
        }
      });
    },

    /**
     * 渲染表格中 "检测更新" 列内容的 Tooltip 提示内容
     * @param {number} checkModUpdateState 当前模组的检测更新状态
     * @param {{}} mod 当前模组数据对象
     */
    renderTableUpdateCheckColumnTooltipTitle(checkModUpdateState, mod) {
      const h = this.$createElement;
      const children = [];
      const options = {};
      let title = '整合包文件名及版本还未加载完成<br>请稍后 ~';

      // 文件名及版本字段还在加载中时, 此时不允许检测更新
      if (mod.filename) {
        switch (checkModUpdateState) {
          case 1: title = '当前模组已经是最新的了 ~'; break;
          case 2: title = '当前模组有更新<br>在左侧查看详细信息 ~'; break;
          case 3: title = '请稍后, 正在等待检测模组更新 ...'; break;
          case 4: title = '请稍后, 正在检测模组更新 ...'; break;
          case 5: title = '检测模组更新失败, 请重试 ~'; break;
          case 6: title = '未检测到对应版本<br>请联系整合包作者 ~'; break;
          default: title = h('span', null, [
            h('div', null, '单击检测当前模组更新'),
            h('div', null, [
              '点击 ',
              h('span', { staticClass: 'color-primary cursor-pointer', on: { click: this.checkModsUpdateByActiveTab } }, '这里'),
              ' 检测当前页模组更新'
            ])
          ]);
        }
      }

      if (typeof title === 'string') {
        options.domProps = { innerHTML: title };
      } else {
        children.push(title);
      }

      return h('div', Object.assign({ slot: 'title' }, options), children);
    },

    /**
     * 渲染表格中 "模组主页" 列内容
     * @param {string} href 模组主页
     * @param {{}} mod 当前模组数据对象
     */
    renderTableHomeColumn(href, mod) {
      if (href) {
        return this.$createElement('safe-a', {
          attrs: { href }
        });
      }
    },

    /**
     * 复制内容到剪切板
     */
    copyInnerHTML(event) {
      const clipboard = new Clipboard(event.target);

      clipboard.on('success', () => {
        this.$message.success('复制成功 !');
        clipboard.destroy();
      });

      clipboard.on('error', () => {
        this.$message.error('复制失败 !');
        clipboard.destroy();
      });

      clipboard.onClick(event);
    }

  }

};
