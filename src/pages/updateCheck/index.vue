<template>
  <div class="update-check-root">
    <!-- 文件加载中 -->
    <template v-if="state === 0">
      <a-spin tip="Loading ..." />
    </template>
    <!-- 文件加载失败 -->
    <template v-else-if="state === 2">
      <a-result status="error" title="获取 README.md 文件失败" :sub-title="stateError.message">
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
            :scroll="{ y: 'max-content' }"
            :columns="contentTableColumns"
            :data-source="contentJson[menuData.key]"
          ></a-table>
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
      /** */
      contentTableColumns: [
        { title: '名称', dataIndex: 'title', width: '12em' },
        { title: '模组名', dataIndex: 'subTitle' },
        { title: '模组主页', dataIndex: 'href' }
      ]
    }),
    computed: {
      /** README.md 文件的 JSON 格式内容 */
      contentJson() {
        const json = {};

        if (this.state === 1) {
          const tokensList = parseMarkdown(this.content);

          this.menuDataList.forEach((menuData) => {
            const tableTitleIndex = tokensList.findIndex((token) => token.type === 'html' && isTableTitle(menuData.label, token.text));
            const tableTokens = tokensList[tableTitleIndex + 1];
            const tableData = json[menuData.key] = [];

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

              tableData.push({
                title: title.replace(/\s*-\s*$/, '').trim(),
                subTitle,
                href
              });
            });
          });
        }

        console.log(json);

        return json;
      }
    },
    methods: {
      /** 获取文件内容 */
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
      }
    },
    mounted() {
      this.getFileContent();
    }
  };
</script>
