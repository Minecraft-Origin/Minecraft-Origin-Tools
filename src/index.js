import Vue from 'vue';
import VueDesignVue from 'ant-design-vue';
import Index from './index.vue';


Vue.use(VueDesignVue);


new Vue({
  ...Index
}).$mount('#app');
