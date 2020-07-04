<template>
  <a-layout>
    <a-layout-sider>
      <a-menu mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">Basis</a-menu-item>
        <a-menu-item key="2">Basis+</a-menu-item>
        <a-menu-item key="3">Enhance</a-menu-item>
        <a-menu-item key="4">Ultimate_Limit</a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content :class="['update-check-content']" :style="{ margin: '24px 16px 0' }">
        <a-spin tip="Loading ..." />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
  import './index.scss?insert';

  export default {

  }
</script>