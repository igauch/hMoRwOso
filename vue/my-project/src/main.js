// The Vue build version to load with the `import` command
/**
 * webpack加紧学习
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
   * 这里的#app不是App.vue里的，是index.html里的
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
   * 毫无疑问，vue对此绝对做了什么手脚，看下此页第15行打印出来的东西
   *
   * 此处为{'app':App}的简写,键值app作为组件名可变
   */
  components: { App }
});
