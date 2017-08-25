<!--

每个 .vue 文件包含三种类型的顶级语言块 <template>, <script> 和 <style>，还允许添加可选的自定义块
https://vue-loader.vuejs.org/zh-cn/start/spec.html

-->
<template>
  <div id="app">
    <router-view>

    </router-view>
  </div>
</template>

<!--

这个script可以删掉，因为他没用

-->
<script>
export default {
  name: 'app'
}
</script>

<!--

添加scss以支持scss
请注意：需要一些依赖的安装，见http://vuejs-templates.github.io/webpack/pre-processors.html

-->
<style lang="scss">
  @import "~bootstrap/scss/bootstrap.scss";
  @import "~element-ui/lib/theme-default/index.css";

  $brand-primary:#0885FD;

  html{
    font-size: 14px;
  }
  html, body, #app {
    height: 100%;
  }
  /* 工具类 */
  .cursor-pointer{
    cursor: pointer;
  }
  .flex-1{
    flex: 1;
  }
  .a-p{
    &,&:hover,&:active,&:focus,&:visited,&.active{
      text-decoration: none;
      color: $brand-primary;
    }
  }
</style>
