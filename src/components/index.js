import Vue from 'vue';
import SafeA from './safe-a/safeA.vue';

[
  SafeA
].forEach((component) => {
  Vue.component(component.name, component);
});
