<template>
  <ul class="howso-sidenav-root">
    <!--

    父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。
    一个常见错误是试图在父组件模板内将一个指令绑定到子组件的属性/方法

    -->
    <howso-sidenav-item :data="data" :align="align" v-for="(data , index) in navListData"
                        :key="index"></howso-sidenav-item>
  </ul>
</template>

<script>

  //  根据激活的路由初始化展开的部分
  //  let activeShow = function () {
  //    let allShowEle = $root.filter('.router-link-active').parents().filter(function () {
  //      if (this.nodeName === 'UL') {
  //        return true
  //      }
  //    });
  //    allShowEle.map(function (v) {
  //      if (attr.type !== 'right') {
  //        angular.element(v).prev().find('.caretCtrl').removeClass('caret-right').addClass('caret');
  //      }
  //    });
  //    $.map(allShowEle).show();
  //  };
  export default {
    name: 'sideNav',
    components: {
      howsoSidenavItem: {
        name: 'howsoSidenavItem',
        template:
          `<li class="list-unstyled bg-primary">
            <a v-if="data.href" class="bg-primary cursor-pointern d-block" :to="data.href" @click="itemClick">
              <span v-if="data.iconClass" class="d-inline-block" :class="data.iconClass"></span>{{data.label}}
            </a>
            <div v-if="!data.href" class="cursor-pointer d-flex align-items-center"  @click="itemClick">
              <span v-if="data.iconClass" class="d-inline-block" :class="data.iconClass"></span>
              <span class="menuTitle">{{data.label}}</span>
              <span class="flex-1"></span>
              <span class="caretCtrl caret-right" v-if="data.children&&data.children.length"></span>
            </div>
            <ul v-if="data.children" :class="align" hidden>
              <howso-sidenav-item :data="data" v-for="(data,index) in data.children" :key="index"></howso-sidenav-item>
            </ul>
           </li>`,
        props:['data','align'],
        methods: {
          itemClick: function ($rootEle) {
            let $activeLinkEle=$rootEle.getElementsByClassName('router-link-active');
            console.log($rootEle.nodeChilds);
          }
        }
      }
    },
    props: ['navListData', 'align'],
    data(){
      return {

      }
    },
    methods:{
      expandByActiveRouter(e){
        console.log(e);
      }
    },
    created(){
      console.log(this.navListData);
    },
    mounted(){
      this.expandByActiveRouter(this.$el);
      console.log(this.navListData);
    }
  }
</script>
