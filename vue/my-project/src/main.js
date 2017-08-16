// The Vue build version to load with the `import` command
/**
 * TODO webpack加紧学习
 * TODO jquery插件
 */
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/**
 * import官方原生的语法是import ... from "module-name"
 * ？？？module-name？？？含有export接口的模块，其实就是文件路径？省略.js后缀而已？
 * module-name如果不使用相对或绝对路径，默认从node_modules里去取
 * module-name为文件夹时默认index.js为引导
 * 这些比较怪异的模式应该是被node、webpack等处理过
 */
import Vue from 'vue'
import {
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  RadioGroup,
  RadioButton,
  Tooltip } from 'element-ui'
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Tooltip);
/**
 * 也可以去掉vue的后缀
 */
import App from './App.vue'
import { router } from './router.index'
import axios from 'axios'

/**
 * 扩展Vue原型链以在每个Vue实例、组件中使用
 * 因为Vue组件和实例的this都指向Vue，所以使用时直接this.$http
 */
Vue.prototype.$http=axios;

/**
 * @type {boolean}
 * 设置为 false 以阻止 vue 在启动时生成生产提示
 */
Vue.config.productionTip = false;

// console.log(App);

/* eslint-disable no-new */
new Vue({
  /**
   * 提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例
   * 这里的#app不是App.vue里的，是index.html里的
   * 挂载元素会被 Vue 生成的 DOM 替换
   */
  el: '#app',
  /**
   * 使用路由
   * {router:router}的简写，当简写时router不可变，其实就是键router\vue实例的属性不可变
   */
  router,
  /**
   * vue实例要加载的模板
   * <>括起来的是以.vue为后缀名的组件模板，如果使用必须在components里指明
   * 常用的还有#开头的类似选择器的字符串，其对应的模板写法有<template>标签和<script type="x-template">
   */
  template: '<App/>',
  /**
   * 声明要注册的组件
   * App就是从App.vue导进来的App
   * ？？？看起来有点怪异？？？
   * 毫无疑问，vue对此绝对做了什么手脚，打印出App看看
   * 应该是被vue-loader处理了
   * 此处为{'app':App}的简写,键值app作为组件名可变
   */
  components: { App }
});
