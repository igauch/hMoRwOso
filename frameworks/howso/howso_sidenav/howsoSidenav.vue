<template>
  <ul class="howso-sidenav-root">
    <!--

    父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。
    一个常见错误是试图在父组件模板内将一个指令绑定到子组件的属性/方法

    -->
    <howso-sidenav-item :activePathDeeps="activePathDeep" :datas="data" :align="align" v-for="(data , index) in navListData"
                        :key="index"></howso-sidenav-item>
  </ul>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'sideNav',
    components: {
      howsoSidenavItem: {
        name: 'howsoSidenavItem',
        template:
          `<li class="list-unstyled">
            <router-link v-if="data.path" class="d-block a-p" :to="data.path" @click="itemClick">
              <span v-if="data.iconClass" class="d-inline-block" :class="data.iconClass"></span>{{data.label}}
            </router-link>
            <div v-if="!data.path" class="cursor-pointer d-flex align-items-center"  @click="itemClick">
              <span v-if="data.iconClass" class="d-inline-block" :class="data.iconClass"></span>
              <span class="menuTitle">{{data.label}}</span>
              <span class="flex-1"></span>
              <span class="iconfont icon-triangle" v-if="data.children&&data.children.length"></span>
            </div>
            <ul v-show="data.children&&!data.isFolder" :class="[align, data.deepClass]">
              <howso-sidenav-item :activePathDeeps="activePathDeep" :datas="data" v-for="(data,index) in data.children" :key="index"></howso-sidenav-item>
            </ul>
           </li>`,
        props:['datas','align','activePathDeeps'],
        data(){
          return{
            data:this.datas,
            activePathDeep:this.activePathDeeps
          }
        },
        methods: {
          itemClick: function () {
            this.data.isFolder!==undefined&&Vue.set(this.data,'isFolder',!this.data.isFolder);
          }
        }
      }
    },
    props: ['datas','align'],
    /**
     * 只有data里的数据才具有响应式特性，且不传递到其下级数据，下级数据的修改需要使用set或可被VUE观测到的方法
     */
    data(){
      return {
        navListData:this.datas,
        activePathDeep:0//当前路由的数据深度
      }
    },
    methods:{

    },
    created(){
      let deep=0; //记录当前循环的数据深度
      /**
       * 格式化传进来的导航数据，就是增加一些字段以数据驱动DOM行为
       * @param data 遍历的数组
       */
      let initNavData=(data)=>{
        deep++;
        data=data.map( (v,k) => {
          if(!v.children){
            deep=(k===data.length-1) ? (deep-1) : deep;
            return v;
          }
          /**
           * 只要改变且关于视图刷新的无论何时都要使用那些可以被VUE观察到的方法
           */
          Vue.set(v,'isFolder',Boolean(deep));
          Vue.set(v,'deep',deep);
          initNavData(v.children);
          deep=(k===data.length-1) ? (deep-1) : deep;
          return v;
        });
      };
      initNavData(this.navListData);
    },
    mounted(){

    }
  }
</script>
