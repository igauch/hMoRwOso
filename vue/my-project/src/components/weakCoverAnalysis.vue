<template>
  <div>
    <table class="table table-bordered table-striped table-hover">
      <thead>
      <tr>
        <th class="index">序号</th>
        <th class="date">日期</th>
        <th class="area">地市</th>
        <th class="area">区县</th>
        <th class="vendor">设备厂商</th>
        <th>MR覆盖率(%)</th>
        <th>MR弱覆盖率(%)</th>
        <th>弱覆盖采样点数</th>
        <th>采集小区数</th>
        <th>总采样点数</th>
        <th class="re">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(li,index) in list" :key="index">
        <td class="text-center">
          <div v-hide="li.assist">{{(pageConfig.list.current-1)*pageSize+$index+1}}</div>
        </td>
        <td class="text-center">{{li.date}}</td>
        <td class="text-center">{{li.city}}</td>
        <td class="text-center">{{li.district}}</td>
        <td class="text-center">{{li.vendor}}</td>
        <td class="text-right">{{li.MRCoverageRate}}</td>
        <td class="text-right">{{li.MRPoorCoverageRate}}</td>
        <td class="text-right">{{li.PoorCoverageSamplingPoints}}</td>
        <td class="text-right">{{li.gatherCellNums}}</td>
        <td class="text-right">{{li.totalSamplingPoints}}</td>
        <td class="text-center">
          <div v-hide="li.assist"><!--v-click="layer('#plotTable',$event,$index)"-->
            <a href="javascript:void (0);">小区详表</a>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import resources from '../js/commons/resources'

  export default {
    name:'weakCoverAnalysis',
    data(){
      return{
        list:[]
      }
    },
    created(){
      resources.PoorCoverageList({
        area:'',
        startTime:'2017-07-11',
        endTime:'2017-07-11',
        pageSize:'10',
        pageNumber:'1'}).then((data)=>{
        this.list=data
      });
    }
  }
</script>
