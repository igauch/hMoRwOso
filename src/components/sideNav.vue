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
            "l":"1-1",
            children: [
              {
                "label": "网络覆盖概况",
                "class": "subMenu1",
                "iconClass": "cirIcon",
                "path": '/weakCoverAnalysis',
                "l":"1-1-1"
              },
              {
                "label": "网络覆盖地理化",
                "class": "subMenu1",
                "iconClass": "cirIcon",
                "l":"1-1-2",
                children: [
                  {
                    "label": "重叠覆盖度分析",
                    "class": "subMenu2",
                    "path": 'overlappingCoverAnalysis',
                    "l":"1-1-2-1"
                  },
                  {
                    "label": "过覆盖分析",
                    "class": "subMenu2",
                    "path": 'overCoverAnalysis',
                    "l":"1-1-2-2",
                    children: [
                      {
                        "label": "重叠覆盖度分析",
                        "class": "subMenu2",
                        "path": 'overlappingCoverAnalysis',
                        "l":"1-1-2-1-1"
                      },
                      {
                        "label": "过覆盖分析",
                        "class": "subMenu2",
                        "path": 'overCoverAnalysis',
                        "l":"1-1-2-1-2"
                      },
                      {
                        "label": "弱覆盖分析",
                        "class": "subMenu2",
                        "path": 'networkCoverOverview',
                        "l":"1-1-2-1-3"
                      }
                    ]
                  },
                  {
                    "label": "弱覆盖分析",
                    "class": "subMenu2",
                    "path": 'networkCoverOverview',
                    "l":"1-1-2-3"
                  }
                ]
              },
              {
                "label": "网络覆盖分析",
                "class": "subMenu1",
                "iconClass": "cirIcon",
                "l":"1-1-3",
                children: [
                  {
                    "label": "重叠覆盖度分析",
                    "class": "subMenu2",
                    "path": 'overlappingCoverAnalysis',
                    "l":"1-1-3-1",
                    children: [
                      {
                        "label": "重叠覆盖度分析",
                        "class": "subMenu2",
                        "path": 'overlappingCoverAnalysis',
                        "l":"1-1-3-1-1",
                        children: [
                          {
                            "label": "重叠覆盖度分析",
                            "class": "subMenu2",
                            "path": 'overlappingCoverAnalysis',
                            "l":"1-1-3-1-1-1"
                          },
                          {
                            "label": "过覆盖分析",
                            "class": "subMenu2",
                            "path": 'overCoverAnalysis',
                            "l":"1-1-3-1-1-2"
                          },
                          {
                            "label": "弱覆盖分析",
                            "class": "subMenu2",
                            "path": 'networkCoverOverview',
                            "l":"1-1-3-1-1-3"
                          }
                        ]
                      },
                      {
                        "label": "过覆盖分析",
                        "class": "subMenu2",
                        "path": 'overCoverAnalysis',
                        "l":"1-1-3-1-2"
                      },
                      {
                        "label": "弱覆盖分析",
                        "class": "subMenu2",
                        "path": 'networkCoverOverview',
                        "l":"1-1-3-1-3"
                      }
                    ]
                  },
                  {
                    "label": "过覆盖分析",
                    "class": "subMenu2",
                    "path": 'overCoverAnalysis',
                    "l":"1-1-3-1",
                  },
                  {
                    "label": "弱覆盖分析",
                    "class": "subMenu2",
                    "path": 'networkCoverOverview',
                    "l":"1-1-3-1",
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
