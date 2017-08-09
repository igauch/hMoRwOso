import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

/**
 * 安装 Vue.js 插件
 */
Vue.use(Router);
/**
 * export default时在import defaultMember时defaultMember可以随意命名且不能加{}
 * 并且一个js文件只能有一个这样的export，可以添加其他的已经命名好的export
 * export var在import时必须import {var}
 */
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})
