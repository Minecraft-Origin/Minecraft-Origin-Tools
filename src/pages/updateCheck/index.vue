<template>
  <div class="update-check-root" :class="`state-${state}`">
    <!-- 文件加载中 -->
    <template v-if="state === 0">
      <a-spin tip="Loading ..." />
    </template>
    <!-- 文件加载失败 -->
    <template v-else-if="state === 2">
      <a-result status="error" title="获取 README.md 文件失败" :sub-title="stateError && stateError.message">
        <template #extra>
          <a-button
            v-for="(btnData, index) in retryButtonDataList" :key="btnData.cycles"
            type="primary"
            :loading="retryActiveButtonIndex === index"
            :disabled="retryActiveButtonIndex !== null && retryActiveButtonIndex !== index"
            @click="retryGetFileContent(btnData.cycles)"
          >
            {{ btnData.label }}
            {{ retryActiveButtonIndex === index && index > 0 ? `( ${ retryCount } )` : '' }}
          </a-button>
        </template>
      </a-result>
    </template>
    <!-- 文件加载完成 -->
    <template v-else-if="state === 1">
      <a-tabs :default-active-key="menuDataList[0].key">
        <a-tab-pane v-for="menuData in menuDataList" :key="menuData.key" :tab="menuData.label">
          <a-table
            size="middle"
            :pagination="false"
            :columns="contentTableColumns"
            :data-source="contentJson[menuData.key]"
          >
            <!-- 将模组中文名和英文名拼接起来 -->
            <template slot="name" slot-scope="name, record">
              <span v-text="name"/>
              <span v-if="record.subTitle && !name.includes(record.subTitle)">- {{ record.subTitle }}</span>
            </template>
            <!-- 版本号 -->
            <template slot="version" slot-scope="version, record">
              <!-- 版本号加载中 -->
              <a-spin v-if="!record.versionCheckState" size="small" />
              <!-- 版本号加载完成 -->
              <span v-text="version" />
            </template>
            <!-- 使模组主页可点击跳转 -->
            <template slot="href" slot-scope="href">
              <a v-if="href" target="_blank" rel="noreferrer" :href="href" v-text="href" />
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </template>
  </div>
</template>

<script>
  import './index.scss?insert';
  import getGitHubFile from '../../tools/getGitHubFile';
  import parseMarkdown from './util/parseMarkdown';
  import isTableTitle from './util/isTableTitle';

  export default {
    data: () => ({
      /**
       * README.md 文件加载状态
       *  - 0: 加载中
       *  - 1: 加载完成
       *  - 2: 加载失败
       */
      state: 0,
      /** 加载失败时 Ajax 异常对象 */
      stateError: null,
      /** 加载失败时重试次数 */
      retryCount: 0,
      /** 加载失败时点击的重试按钮 Index */
      retryActiveButtonIndex: null,
      /** 加载失败时需要渲染的重试按钮相关数据 */
      retryButtonDataList: [
        { label: '重试', cycles: 1 },
        { label: '重试 10 次', cycles: 10 },
        { label: '重试到成功为止', cycles: Infinity }
      ],
      /** 菜单数据 */
      menuDataList: [
        { label: '基础', key: 'Basis' },
        { label: '基础+', key: 'Basis+' },
        { label: '增强', key: 'Enhance' },
        { label: '极限', key: 'Ultimate_Limit' }
      ],
      /** README.md 文件内容 */
      content: '',
      /** README.md 文件内容 ( JSON 格式 ) */
      contentJson: {},
      /** 表格列头 */
      contentTableColumns: [
        { title: '名称', dataIndex: 'title', width: '28em', scopedSlots: { customRender: 'name' } },
        { title: '文件名及版本', dataIndex: 'version', scopedSlots: { customRender: 'version' } },
        { title: '模组主页', dataIndex: 'href', scopedSlots: { customRender: 'href' } }
      ]
    }),
    methods: {
      /** 获取 README.md 文件内容 */
      async getFileContent() {
        try {
          this.content = await getGitHubFile('/README.md');
          this.stateError = null;
          this.state = 1;
        } catch (error) {
          this.content = '';
          this.stateError = error;
          this.state = 2;
        }

        // 如果获取 README.md 文件成功, 那么就解析其内容然后对模组信息进行获取
        if (this.state === 1) {
          // 解析文件
          this.contentJson = this.compileContentToJson();
          // 获取模组信息
          try {
            const modsInfo = (await getGitHubFile('/Minecraft Origin/.minecraft/mods')).filter((data) => data.type === 'file');
            const { contentJson, menuDataList } = this;

            Object.entries(contentJson).forEach(([type, modsData]) => {
              const typeLabel = menuDataList.find(({ key }) => key === type).label;

              modsData.forEach((mod) => {
                const modTitle = mod.title;
                const modInfo = modsInfo.find(({ name }) => name.includes(`[ ${typeLabel} ]`) && name.includes(`[ ${modTitle} ]`));

                // 未读取到模组信息
                if (!modInfo) this.$set(mod, 'versionCheckState', 0);
                // 读取到了模组信息, 获取当前模组版本
                else {
                  this.$set(mod, 'versionCheckState', 1);
                  this.$set(mod, 'version', modInfo.name.split(']').reverse()[0].trim());
                }
              });
            });
          } catch (error) {
            console.log(error);
          }
        }
      },
      /** 点击重试按钮 */
      async retryGetFileContent(cycles) {
        this.state = 2;
        this.retryCount = 0;
        this.retryActiveButtonIndex = this.retryButtonDataList.map(({ cycles: _cycles }) => _cycles).indexOf(cycles);

        for (let i = 0; i < cycles; i++) {
          this.retryCount++;
          await this.getFileContent(); // eslint-disable-line no-await-in-loop
          if (this.state === 1) break;
        }

        this.retryCount = 0;
        this.retryActiveButtonIndex = null;
      },
      /** 解析 README.md 文件为 JSON 格式 */
      compileContentToJson() {
        const contentJson = {};
        const tokensList = parseMarkdown(this.content);

        this.menuDataList.forEach((menuData) => {
          const tableTitleIndex = tokensList.findIndex((token) => token.type === 'html' && isTableTitle(menuData.label, token.text));
          const tableTokens = tokensList[tableTitleIndex + 1];
          const tableData = contentJson[menuData.key] = [];

          // 遍历出数据
          tableTokens.tokens.cells.forEach(([data]) => {
            /** 中文名称, 原始名称, 模组主页 */
            let title = ''; let subTitle = ''; let href = '';

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

            tableData.push({
              title,
              subTitle,
              href
            });
          });
        });

        return contentJson;
      }
    },
    mounted() {
      this.getFileContent();
    }
  };
</script>
