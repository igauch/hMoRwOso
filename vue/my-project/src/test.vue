<template>
  <sidenav :navListData="navListDatas"></sidenav>
</template>

<script>
  import sidenav from "../frameworks/howso/howso_sidenav/howsoSidenav.vue";
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
                "href": 'networkCoverOverview'
              },
              {
                "label": "网络覆盖地理化",
                "class": "subMenu1",
                "iconClass": "cirIcon",
                "href": 'networkCoverGeography'
              },
              {
                "label": "网络覆盖分析",
                "class": "subMenu1",
                "iconClass": "cirIcon",
                "children": [
                  {
                    "label": "重叠覆盖度分析",
                    "class": "subMenu2",
                    "href": 'overlappingCoverAnalysis'
                  },
                  {
                    "label": "过覆盖分析",
                    "class": "subMenu2",
                    "href": 'overCoverAnalysis'
                  },
                  {
                    "label": "弱覆盖分析",
                    "class": "subMenu2",
                    "href": 'weakCoverAnalysis'
                  }
                ]
              }
            ]

          }
        ]
      }
    }
  }
</script>
