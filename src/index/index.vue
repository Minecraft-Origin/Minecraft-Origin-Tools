<template>
  <div id="app">
    <a-tabs size="large" default-active-key="1">
      <!-- 模组更新检测 -->
      <a-tab-pane key="1" tab="Update Check"><UpdateCheck /></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import UpdateCheck from '../pages/updateCheck/index.vue';
  import './index.scss?insert';

  export default {

    components: {
      UpdateCheck
    }
  };
</script>
