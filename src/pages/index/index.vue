<template>
  <a-layout id="app">
    <!-- 页面侧边栏 -->
    <a-layout-sider class="app-sider" :width="siderWidth">
      <div class="app-sider-name">Minecraft Origin Tools</div>
      <a-menu class="app-sider-menu" theme="dark" mode="inline" :default-selected-keys="[0]" @select="changeMenuActiveIndex">
        <a-menu-item v-for="(menuData, index) in menuDataList" :key="index">
          <a-icon v-if="menuData.icon" :type="menuData.icon" />
          <span v-text="menuData.label" />
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <!-- 页面主体内容 -->
    <a-layout :style="{ marginLeft: `${ siderWidth }px` }">
      <a-layout-content class="app-content">
        <div v-if="menuActiveItem.component" :is="menuActiveItem.component" />
        <a-empty v-else :description="false" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
  import UpdateCheck from '../updateCheck/updateCheck.vue';
  import './index.scss?insert';

  export default {
    data: () => ({
      /** 侧边栏宽度 */
      siderWidth: 280,
      /** 菜单列表中被激活的菜单 Index */
      menuActiveIndex: 0,
      /** 菜单列表数据 */
      menuDataList: [
        { label: 'Update Check', icon: 'star', component: 'update-check' }
      ]
    }),
    computed: {
      /** 菜单列表中被激活的菜单 */
      menuActiveItem: ({ menuDataList, menuActiveIndex }) => menuDataList[menuActiveIndex]
    },
    methods: {
      /** 被选中的菜单切换时记录当前菜单 Index */
      changeMenuActiveIndex({ key }) {
        this.menuActiveIndex = key;
      }
    },
    components: {
      UpdateCheck
    }
  };
</script>
