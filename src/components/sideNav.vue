<template>
  <sidenav :datas="navListDatas"></sidenav>
</template>

<script>
  import Vue from 'vue'
  import sidenav from "../../frameworks/howso/howso_sidenav/howsoSidenav.vue";
  export default {
    name:'sideNav',
    components:{sidenav},
    data(){
      return {
        navListDatas:[
          {
            "label": "MRO分析",
            "class": "menu",
            "iconClass": "icon1",
            children: [
              {
                "label": "网络覆盖概况",
                "class": "subMenu1",
                "iconClass": "cirIcon",
                "path": 'networkCoverOverview'
              },
              {
                "label": "网络覆盖地理化",
                "class": "subMenu1",
                "iconClass": "cirIcon",
                "path": 'networkCoverGeography'
              },
              {
                "label": "网络覆盖分析",
                "class": "subMenu1",
                "iconClass": "cirIcon",
                "children": [
                  {
                    "label": "重叠覆盖度分析",
                    "class": "subMenu2",
                    "path": 'overlappingCoverAnalysis'
                  },
                  {
                    "label": "过覆盖分析",
                    "class": "subMenu2",
                    "path": 'overCoverAnalysis'
                  },
                  {
                    "label": "弱覆盖分析",
                    "class": "subMenu2",
                    "path": 'weakCoverAnalysis'
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    methods:{

    }
  }
</script>
