<template>
  <div></div>
</template>

<script>
export default {
  name:'echarts',
  props:['option'],
  watch:{
    option:function (newVal) {
      let chart=this.echarts.init(this.$el);
      chart.setOption(newVal);
    }
  },
  mounted(){
    let chart=this.echarts.init(this.$el);
    chart.setOption(this.option);
  }
}
</script>

<style scoped>
  div{
    width: 100%;
    height: 100%;
  }
</style>
