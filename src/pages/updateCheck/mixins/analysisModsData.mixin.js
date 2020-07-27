/* eslint-disable brace-style */


import parseMarkdown from '../util/parseMarkdown';
import isTableTitle from '../util/isTableTitle';


export default {
  methods: {

    /**
     * 解析 README.md 文件内容, 得到所有模组信息
     * @param {string} readmeContent README.md 文件内容
     */
    analysisModsData(readmeContent) {
      const modpackData = {};
      const tokensList = parseMarkdown(readmeContent);

      // 按照整合包版本遍历出所属模组
      this.modpackTypeList.forEach(({
        label: menuLabel,
        key: menuKey
      }) => {
        const tableTitleIndex = tokensList.findIndex((token) => token.type === 'html' && isTableTitle(menuLabel, token.text));
        const tableTokens = tokensList[tableTitleIndex + 1];
        const tableData = modpackData[menuKey] = [];

        // 遍历出该整合包版本下的模组
        tableTokens.tokens.cells.forEach(([data]) => {
          /** 中文名称 */
          let title = '';
          /** 原始名称 */
          let subTitle = '';
          /** 模组主页 */
          let href = '';

          data.forEach((item) => {
            switch (item.type) {
              case 'text': title += item.text; break;
              case 'link': subTitle = item.text; href = item.href; break;
              default:
            }
          });

          // 去除中文名称和原始名称中间的连接符
          title = title.replace(/\s*-\s*$/, '').trim();
          // 转义符号
          title = title.replace('&#39;', '\'').trim();

          // 保存基础模组信息
          tableData.push({
            title,
            subTitle,
            href
          });
        });
      });

      return modpackData;
    },

    /**
     * 解析模组文件夹内的模组, 获取模组其余相关信息
     * @param {*} contentList 模组文件夹内的文件及文件夹列表
     */
    analysisModsFileInfo(contentList) {
      /** 所有的模组数据 */
      const files = contentList.filter(({ type }) => type === 'file');

      // 遍历整合包各个版本, 依次查找出所有模组信息
      Object.entries(this.modpackData).forEach(([modpackType, modsData]) => {
        /** 整合包版本名称 */
        const modpackTypeLabel = this.modpackTypeList.find(({ key }) => key === modpackType).label;

        modsData.forEach((mod) => {
          let modTitle = mod.title;

          // 前置模组去除前缀, 否则无法匹配到模组信息
          if (modTitle.includes('[ 前置 ]')) {
            modTitle = modTitle.split(']').slice(-1)[0].trim();
          }
          // 一个大模组下的不同分支小模组, 在 README.md 和在模组文件夹下, 命名规则是不一样的
          else if (/^([^(]+)\(([^)]+)\)$/.test(modTitle)) {
            // `XXXX ( YY )` -> `XXXX - YY`
            modTitle = modTitle.replace(/\s/g, '').replace(/^([^(]+)\(([^)]+)\)$/, '$1 - $2');
          }

          // 遍历所有的模组数据读取模组信息位置
          const modInfoIndex = files.findIndex(({ name }) => {
            return name.includes(`[ ${modpackTypeLabel} ]`)
                && name.includes(`[ ${modTitle} ]`);
          });

          // 未读取到模组信息
          if (modInfoIndex < 0) this.$set(mod, 'nameGetState', 2);
          // 读取到了模组信息, 获取当前模组文件名及版本
          else {
            // 获取并删除模组信息, 减少之后读取模组信息时的遍历次数
            const modInfo = files.splice(modInfoIndex, 1)[0];

            this.$set(mod, 'nameGetState', 1);
            this.$set(mod, 'file', modInfo.name.split(/\[\s(BOTH|CLIENT|SERVER)\s\]/).slice(-1)[0].trim());
          }
        });
      });
    }

  }
};
