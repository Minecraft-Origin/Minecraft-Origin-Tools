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
      <a-tabs ref="tabs" v-model="tabsActiveKey" @change="onChangeTabs">
        <a-tab-pane v-for="menuData in modpackTypeList" :key="menuData.key" :tab="menuData.label">
          <a-table
            size="middle"
            :pagination="false"
            :columns="modsTableColumns"
            :data-source="modpackData[menuData.key]"
          >
            <!-- 将模组中文名和英文名拼接起来 -->
            <template slot="name" slot-scope="name, record">
              <span v-text="name"/>
              <span v-if="record.subTitle && !name.includes(record.subTitle)">- {{ record.subTitle }}</span>
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
  import './updateCheck.scss?insert';
  import getModpackDataMixin from './mixins/getModpackData.mixin';
  import checkModUpdateMixin from './mixins/checkModUpdate.mixin';
  import renderMixin from './mixins/render.mixin';

  export default {
    mixins: [
      // 获取整合包数据相关
      getModpackDataMixin,
      // 检测模组更新相关
      checkModUpdateMixin,
      // 页面渲染函数
      renderMixin
    ],
    data() {
      return {
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
        /** 整合包版本 */
        modpackTypeList: [
          { label: '基础', key: 'Basis' },
          { label: '基础+', key: 'Basis+' },
          { label: '增强', key: 'Enhance' },
          { label: '极限', key: 'Ultimate_Limit' }
        ],
        /** 整合包模组信息数据 */
        modpackData: {},
        /** 当前标签页激活面板的 key */
        tabsActiveKey: '',
        /** 表格列头 */
        modsTableColumns: [
          { title: '名称', dataIndex: 'title', width: '28em', scopedSlots: { customRender: 'name' } },
          { title: '文件名及版本', dataIndex: 'getModFilenameState', width: '28em', customRender: this.renderTableFilename },
          { title: '检测更新', dataIndex: 'checkModUpdateState', width: '88px', align: 'center', customRender: this.renderTableUpdateCheckButton },
          { title: '模组主页', dataIndex: 'href', scopedSlots: { customRender: 'href' } }
        ]
      };
    },
    methods: {
      /** 点击重试按钮 */
      async retryGetFileContent(cycles) {
        this.state = 2;
        this.retryCount = 0;
        this.retryActiveButtonIndex = this.retryButtonDataList.map(({ cycles: _cycles }) => _cycles).indexOf(cycles);

        for (let i = 0; i < cycles; i++) {
          this.retryCount++;
          await this.getModpackData(); // eslint-disable-line no-await-in-loop
          if (this.state === 1) break;
        }

        this.retryCount = 0;
        this.retryActiveButtonIndex = null;
      },
      /** 切换标签页时, 使滚动条回到最顶上 */
      onChangeTabs() {
        const tabsVm = this.$refs.tabs;
        const tabsEl = tabsVm.$el;
        tabsEl.scrollIntoView();
      }
    },
    mounted() {
      this.getModpackData();
    }
  };
</script>
