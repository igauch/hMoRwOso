<template>
  <!--

  只能有一个根标签，这个NG1的指令一致，否则报错

  -->
  <div class="root-login">
    <h3 class="text-center mb-5">{{msg}}</h3>
    <form class="m-auto">
      <div class="form-group row">
        <label for="username" class="col-3 col-form-label">用户名:</label>
        <div class="col-9">
          <input id="username" name="username" class="form-control" placeholder="请输入用户名" v-model="userName"/>
        </div>
      </div>
      <div class="form-group row">
        <label for="password" class="col-3 col-form-label">密码:</label>
        <div class="col-9">
          <input id="password" name="password" type="password" class="form-control" placeholder="请输入密码" v-model="passWord"/>
        </div>
      </div>
      <div class="form-group d-flex justify-content-center">
        <input type="button" class="btn btn-primary" value="登录" @click="login">
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    /**
     * 允许组件模板递归地调用自身。注意，组件在全局用 Vue.component() 注册时，全局 ID 自动作为组件的 name。
     * 指定 name 选项的另一个好处是便于调试。有名字的组件有更友好的警告信息。
     */
    name: 'login',
    /**
     * 所有在html中用到的数据都需要现在data里定义，这和NG1有区别
     */
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        userName:'',
        passWord:''
      }
    },
    methods: {
      login: function () {
        if(this.userName){
          sessionStorage.setItem('userName',this.userName);
          this.$router.push('overview');
        }
      }
    }
  }
</script>

<!--

添加scoped以让样式只作用于这个组件
请注意：并不是作用于调用这个组件的页面，而是像内联样式一样只作用于这个组件的template

-->
<style scoped>
  .root-login{
    position: relative;
    top:50%;
    margin-top: -100px;
  }
  form {
    width: 310px;
  }
</style>
