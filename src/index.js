import Vue from 'vue';
import VueDesignVue, { notification } from 'ant-design-vue';
import Index from './pages/index/index.vue';
import './components/index';
import './styles/utils.scss?insert';


Vue.use(VueDesignVue);

Vue.prototype.$notification = notification;


new Vue({
  ...Index
}).$mount('#app');
