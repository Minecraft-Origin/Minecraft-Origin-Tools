import Vue from 'vue';
import VueDesignVue, { notification } from 'ant-design-vue';
import Index from './index/index.vue';
import './styles/utils.scss?insert';


Vue.use(VueDesignVue);

Vue.prototype.$notification = notification;


new Vue({
  ...Index
}).$mount('#app');
