<!--

每个 .vue 文件包含三种类型的顶级语言块 <template>, <script> 和 <style>，还允许添加可选的自定义块
https://vue-loader.vuejs.org/zh-cn/start/spec.html

-->
<template>
  <div id="app">
    <div class="text-white header" v-if="$route.path!=='/login'">
      <div class="container-fluid">
        <i class="iconfont icon-yidong align-middle mr-2"></i>
        <span class="font-weight-bold align-middle align-middle">移动通信网络智能分析平台</span>
        <div class="float-right">
          <span>欢迎你，{{userName}}</span>
          <i class="iconfont icon-loginout align-middle" @click="loginOut"></i>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<!--

这个script可以删掉，因为他没用

-->
<script>
export default {
  name: 'app',
  data(){
    return{
      userName:sessionStorage.getItem('userName')
    }
  },
  methods:{
    loginOut:function () {
      sessionStorage.setItem('userName',null);
      this.$router.push('/login');
    }
  }
}
</script>

<!--

添加scss以支持scss
请注意：需要一些依赖的安装，见http://vuejs-templates.github.io/webpack/pre-processors.html

-->
<style lang="scss">
  @import "assets/style/custom_bootstrap_var";
  @import "~bootstrap/scss/bootstrap.scss";

  html{
    font-size: 14px;
  }
  html, body, #app {
    height: 100%;
  }

  $header-log-size:32px;
  .header{
    background: linear-gradient(to right, $brand-primary, lighten($brand-primary,15%));
    .icon-yidong{
      font-size: $header-log-size;
    }
    .font-weight-bold{
      font-size: 20px;
    }
    div.float-right{
      line-height: 1.5*$header-log-size;
    }
  }
</style>
