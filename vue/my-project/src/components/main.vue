<template>
  <div class="main">
    <top-bar></top-bar>
    <div>
      <side-nav></side-nav>
    </div>
  </div>
</template>

<script>
  import topBar from '@/components/topBar'
  import overView from '@/components/overView'
  import sideNav from '@/components/sideNav'

  export default {
    name: 'main',
//    render:h => h(sideNav),
    /**
     * 即便只需要注册一个组件，也要使用components的形式，否则会报错
     * 这和路由配置那边不一致，？？？为什么？？？
     */
    components: {
      topBar,
      overView,
      sideNav
    }
  }
</script>
