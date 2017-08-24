<template>
  <div class="main">
    <div class="top-bar">
      <top-bar></top-bar>
    </div>
    <div class="side-nav">
      <side-nav></side-nav>
    </div>
    <div class="main-router-view">
      <router-view name="main"></router-view>
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

<style lang="scss">
  .side-nav{
    width: 180px;
    ul{
      padding-left: 10px;
    }
  }
</style>
