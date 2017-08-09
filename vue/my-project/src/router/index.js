import Vue from 'vue'
import Router from 'vue-router'
/**
 * 看webpack配置
 * build文件夹里的webpack.base.conf.js里面的resolve里面的alias
 */
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
  /**
   * routes：一组路由
   */
  routes: [
    {
      /**
       * 对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"
       */
      path: '/',
      /**
       * 定义当前路由的名称，非必需
       */
      name: 'Hello',
      /**
       * 视图组件
       * 如果多个components?: { [name: string]: Component };
       */
      component: Hello
    }
  ]
})
