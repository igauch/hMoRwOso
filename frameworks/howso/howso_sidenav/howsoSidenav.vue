<template>
  <ul class="howso-sidenav-root">
    <!--

    父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。
    一个常见错误是试图在父组件模板内将一个指令绑定到子组件的属性/方法

    -->
    <howso-sidenav-item @itemClick="itemClick" :datas="data" :align="align"
                        v-for="(data , index) in navListData"
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
            <router-link v-if="data.path" class="d-block a-p" :to="data.path" @click.native="itemClick(data)">
              <span v-if="data.iconClass" class="d-inline-block" :class="data.iconClass"></span>{{data.label}}
            </router-link>
            <div v-if="!data.path" class="cursor-pointer d-flex align-items-center"  @click="itemClick(data)">
              <span v-if="data.iconClass" class="d-inline-block" :class="data.iconClass"></span>
              <span class="menuTitle">{{data.label}}</span>
              <span class="flex-1"></span>
              <span class="iconfont icon-triangle" v-if="data.children&&data.children.length"></span>
            </div>
            <ul v-show="data.children&&!data.isFolder" :class="[align, data.deepClass]">
              <howso-sidenav-item @itemClick="itemClick" :datas="data" v-for="(data,index) in data.children" :key="index"></howso-sidenav-item>
            </ul>
           </li>`,
        props: ['datas', 'align'],
        data() {
          return {
            data: this.datas
          }
        },
        methods: {
          itemClick: function (data) {
            this.$emit('itemClick', data);
          }
        }
      }
    },
    props: ['datas', 'align'],
    /**
     * 只有data里的数据才具有响应式特性，且不传递到其下级数据，下级数据的修改需要使用set或可被VUE观测到的方法
     */
    data() {
      return {
        navListData: this.datas,
        activePathAt: 0//当前路由的数据深度
      }
    },
    methods: {
      itemClick: function (pama) {
        let at = pama.at;
        let forTree = (data) => {
          data = data.map((v) => {
            if(at===v.at){
              console.log(at,v.isFolder);
              Vue.set(v,'isFolder',!v.isFolder);
            }else {
              v.isFolder!==undefined && Vue.set(v, 'isFolder', at.join().indexOf(v.at.join()) !== 0);
            }
            v.children && forTree(v.children);
            return v;
          });
        };
        forTree(this.navListData);
      }
    },
    created() {
      let at = [1];
      /**
       * 格式化传进来的导航数据，就是增加一些字段以数据驱动DOM行为
       * @param data 遍历的数组
       */
      let initNavData = (data) => {
        let test = 0;
        data = data.map((v, k) => {
          at.push(++test);
          Vue.set(v, 'at', JSON.parse(JSON.stringify(at)));
          if (v.path === this.$route.path) {
            this.itemClick(v);
          }
          if (!v.children) {
            at.splice(-1, 1);
            return v;
          }
          /**
           * 只要改变且关于视图刷新的无论何时都要使用那些可以被VUE观察到的方法
           */
          Vue.set(v, 'isFolder', true);
          initNavData(v.children);
          at.splice(-1, 1);
          return v;
        });
      };
      initNavData(this.navListData);
    },
    mounted() {

    }
  }
</script>
