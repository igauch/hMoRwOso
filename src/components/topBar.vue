<template>
  <div class="text-white header" v-if="$route.path!=='/login'">
    <div class="container-fluid">
      <i class="iconfont icon-yidong align-middle mr-2"></i>
      <span class="font-weight-bold align-middle align-middle">移动通信网络智能分析平台</span>
      <div class="float-right">
        <span>欢迎你，{{userName}}</span>
        <i class="iconfont icon-loginout" @click="loginOut"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'topBar',
    data() {
      return {
        userName: sessionStorage.getItem('userName')
      }
    },
    methods: {
      loginOut: function () {
        sessionStorage.setItem('userName', null);
        this.$router.push('/login');
      }
    }
  }
</script>

<style lang="scss">
  /* TODO 会多次导入 */
  @import "~bootstrap/scss/bootstrap.scss";
  $brand-primary:#0885fd;
  $header-log-size: 32px;
  .header {
    background: linear-gradient(to right, $brand-primary, lighten($brand-primary, 15%));
    .icon-yidong {
      font-size: $header-log-size;
    }
    .font-weight-bold {
      font-size: 20px;
    }
    div.float-right {
      /* TODO 偶数的时候高度会多1 */
      line-height: 1.5*$header-log-size - 1;
    }
  }
</style>
