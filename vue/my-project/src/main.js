// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
/**
 * 也可以去掉vue的后缀
 */
import App from './App.vue'
import router from './router'

/**
 * @type {boolean}
 * 设置为 false 以阻止 vue 在启动时生成生产提示
 */
Vue.config.productionTip = false;
console.log(App);
/* eslint-disable no-new */
new Vue({
  /**
   * 提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例
   */
  el: '#app',
  router,
  /**
   * App就是从App.vue导进来的App
   * ？？？看起来有点怪异？？？
   * JS的import到底导入的是什么？
   */
  template: '<App/>',
  components: { App }
});
