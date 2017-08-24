<template>
  <ul class="howso-sidenav-root">
    <!--

    父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。
    一个常见错误是试图在父组件模板内将一个指令绑定到子组件的属性/方法

    -->
    <howso-sidenav-item :datas="data" :align="align" v-for="(data , index) in navListData"
                        :key="index"></howso-sidenav-item>
  </ul>
</template>

<script>
  import Vue from 'vue'
//  import $ from 'jquery'
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
            <a v-if="data.href" class="bg-primary cursor-pointern d-block" :to="data.href" @click="itemClick(data,$event)">
              <span v-if="data.iconClass" class="d-inline-block" :class="data.iconClass"></span>{{data.label}}
            </a>
            <div v-if="!data.href" class="cursor-pointer d-flex align-items-center"  @click="itemClick(data,$event)">
              <span v-if="data.iconClass" class="d-inline-block" :class="data.iconClass"></span>
              <span class="menuTitle">{{data.label}}</span>
              <span class="flex-1"></span>
              <span class="caretCtrl caret-right" v-if="data.children&&data.children.length"></span>
            </div>
            <ul v-show="data.children&&data.isFolder" :class="[align, data.deepClass]">
              <howso-sidenav-item :datas="data" v-for="(data,index) in data.children" :key="index"></howso-sidenav-item>
            </ul>
           </li>`,
        props:['datas','align'],
        data(){
          return{
            data:this.datas
          }
        },
        methods: {
          itemClick: function (data,e) {
            this.data.isFolder!==undefined&&Vue.set(this.data,'isFolder',!this.data.isFolder);
//            let deepNum=data.deepClass.replace(/[^\d]/,'');
//            data.isFolder=false;
          }
        }
      }
    },
    props: ['datas','align'],
    data(){
      return {
        navListData:this.datas
      }
    },
    methods:{
      /**
       *
       * @param e
       */
      expandByActiveRouter(e){
        console.log(e);
      }
    },
    created(){
      let activePath=this.$router.path;

      let deep=0, //记录当前循环的数据深度
          activePathDeep=0;//当前路由的数据深度
      /**
       * 格式化传进来的导航数据，就是增加一些字段以数据驱动DOM行为
       * @param data 遍历的数组
       */
      let initNavData=function(data){
        deep++;
        data=data.map(function (v,k) {
          v.path===activePath&&(activePath=deep);
          if(!v.children){
            deep=(k===data.length-1) ? (deep-1) : deep;
            return v;
          }
          Vue.set(v,'isFolder',Boolean(deep));
          v.deepClass='howsoSideNavUl'+deep;
          initNavData(v.children);
          deep=(k===data.length-1) ? (deep-1) : deep;
          return v;
        });
      };
      initNavData(this.navListData);
    },
    mounted(){
      this.expandByActiveRouter(this.$el);
    }
  }
</script>
