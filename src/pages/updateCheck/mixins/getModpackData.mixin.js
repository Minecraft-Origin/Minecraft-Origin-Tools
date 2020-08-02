/* eslint-disable brace-style */


import getGitHubFile from '../util/getGitHubFile';
import parseMarkdown from '../util/parseMarkdown';
import isTableTitle from '../util/isTableTitle';


/**
 * mod.getModFilenameState: 当前模组的加载文件名状态
 *   case 1:  加载完成
 *   case 2:  加载失败
 *   default: 加载中
 */


export default {
  methods: {

    /**
     * 获取整合包内的模组信息
     */
    async getModpackData() {
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
        this.modpackData = this.analysisModpackData(readmeContent);
        // 读取模组列表, 获取模组其余相关信息
        getGitHubFile('/Minecraft Origin/.minecraft/mods').then(this.analysisModsFileInfo).catch((error) => {
          [].concat(...Object.values(this.modpackData)).forEach((mod) => {
            this.$set(mod, 'getModFilenameState', 2);
          });
        });
      }
    },

    /**
     * 解析 README.md 文件内容, 得到所有模组信息
     * @param {string} readmeContent README.md 文件内容
     */
    analysisModpackData(readmeContent) {
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
          let name = '';
          /** 原始名称 */
          let subName = '';
          /** 模组主页 */
          let href = '';

          data.forEach((item) => {
            switch (item.type) {
              case 'text': name += item.text; break;
              case 'link': subName = item.text; href = item.href; break;
              default:
            }
          });

          // 去除中文名称和原始名称中间的连接符
          name = name.replace(/\s*-\s*$/, '').trim();
          // 转义符号
          name = name.replace('&#39;', '\'').trim();

          // 保存基础模组信息
          tableData.push({
            key: `${name}-${subName}-${href}`,
            name,
            subName,
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
          let modTitle = mod.name;

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
          if (modInfoIndex < 0) this.$set(mod, 'getModFilenameState', 2);
          // 读取到了模组信息, 获取当前模组文件名及版本
          else {
            // 获取并删除模组信息, 减少之后读取模组信息时的遍历次数
            const modInfo = files.splice(modInfoIndex, 1)[0];

            this.$set(mod, 'getModFilenameState', 1);
            this.$set(mod, 'name2', modTitle);
            this.$set(mod, 'filename', modInfo.name.split(/\[\s(BOTH|CLIENT|SERVER)\s\]/).slice(-1)[0].trim());
            this.$set(mod, 'platform', modInfo.name.replace(/.*\[\s(BOTH|CLIENT|SERVER)\s\].*/, '$1'));
            this.$set(mod, 'type', modInfo.name.split(']')[0].replace('[', '').trim());
            this.$set(mod, 'modpackType', modInfo.name.split(']')[1].replace('[', '').trim());
          }
        });
      });
    }

  }
};
