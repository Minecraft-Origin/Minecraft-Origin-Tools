import getGitHubFile from '../../../tools/getGitHubFile';


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
        // 解析 README.md 文件
        this.modpackData = this.analysisModsData(readmeContent);
        // 读取模组列表, 获取模组其余相关信息
        getGitHubFile('/Minecraft Origin/.minecraft/mods')
          .then((files) => {
            this.analysisModsFileInfo(files);
            this.getModsUpdateData();
          })
          .catch((error) => {
            [].concat(...Object.values(this.modpackData)).forEach((mod) => {
              this.$set(mod, 'nameGetState', 2);
            });
          });
      }
    },
    /** 获取整合包模组最新版本模组数据 */
    getModsUpdateData() {

    }
  }
};
