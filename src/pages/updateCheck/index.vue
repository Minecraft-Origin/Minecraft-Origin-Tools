<template>
  <a-layout>
    <a-layout-sider :style="{ backgroundColor: '#FFF' }">
      <a-menu mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">Basis</a-menu-item>
        <a-menu-item key="2">Basis+</a-menu-item>
        <a-menu-item key="3">Enhance</a-menu-item>
        <a-menu-item key="4">Ultimate_Limit</a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content :class="['update-check-content']" :style="{ margin: '24px 16px 0' }">
        <!-- 文件加载中 -->
        <template v-if="state === 0">
          <a-spin tip="Loading ..." />
        </template>
        <!-- 文件加载失败 -->
        <template v-else-if="state === 2">
          <a-result status="error" title="获取 README.md 文件失败" :sub-title="stateError.message">
            <template #extra>
              <template v-for="(btnData, index) in retryButtonData">
                <a-button
                  type="primary"
                  :key="btnData.cycles"
                  :loading="retryActiveButtonIndex === index"
                  :disabled="retryActiveButtonIndex !== null && retryActiveButtonIndex !== index"
                  @click="retryGetFileContent(btnData.cycles)"
                >
                  {{ btnData.label }}
                  {{ retryActiveButtonIndex === index && index > 0 ? `( ${ retryCount } )` : '' }}
                </a-button>
              </template>
            </template>
          </a-result>
        </template>
        <!-- 文件加载完成 -->
        <template v-else-if="state === 1">
          <div>{{ contentJson }}</div>
        </template>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
  import './index.scss?insert';
  import getGitHubFile from '../../tools/getGitHubFile';
  import parseMarkdown from './util/parseMarkdown'

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
      retryButtonData: [
        { label: '重试', cycles: 1 },
        { label: '重试 10 次', cycles: 10 },
        { label: '重试到成功为止', cycles: Infinity }
      ],
      /** README.md 文件内容 */
      content: ''
    }),
    computed: {
      /** README.md 文件的 JSON 格式内容 */
      contentJson () {
        let json = {}

        if (this.state === 1) {
          const mdLexer = parseMarkdown(this.content)
          // const 

          console.log(mdLexer)
        }

        return json
      }
    },
    methods: {
      /** 获取文件内容 */
      getFileContent: async function(){
        try {
          this.content = await getGitHubFile('/README.md')
          this.stateError = null
          this.state = 1
        } catch (error) {
          this.content = ''
          this.stateError = error
          this.state = 2
        }
      },
      /** 点击重试按钮 */
      retryGetFileContent: async function (cycles) {
        this.state = 2
        this.retryCount = 0
        this.retryActiveButtonIndex = this.retryButtonData.map(({ cycles }) => cycles).indexOf(cycles)

        for(let i = 0; i < cycles; i++) {
          this.retryCount++
          await this.getFileContent()
          if (this.state === 1) break
        }

        this.retryCount = 0
        this.retryActiveButtonIndex = null
      }
    },
    mounted () {
      this.getFileContent()
    }
  }
</script>