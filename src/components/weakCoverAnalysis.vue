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
          <!--<div v-hide="li.assist">{{(pageConfig.list.current-1)*pageSize+index+1}}</div>-->
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
          <div v-show="!li.assist"><!--v-click="layer('#plotTable',$event,$index)"-->
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
        list:[],
        config:{
          pageSize:10
        },
        layerIndex:null
      }
    },
    methods:{
      //用户列表表格补整
      repairUserListLength : function(total, dataId, check){//total当前页有效数据的总数，dataId要补齐的数据挂载在上的位置
        //计算应该要补的长度
        console.log(this);
        let pushLength = total ? (total % this.config.pageSize ? this.config.pageSize - total % this.config.pageSize : 0) : this.config.pageSize;
        if(!this[dataId]||total===0){//如果该数据还没有被正确初始化，则初始化为数组
          this[dataId]=[];
        }
        for (let i = 0; i < pushLength; i++) {//补齐
          this[dataId].push({assist:true});
        }
//        timeout(function () {//主要避免弹出的表格位置异常问题
//          if(dataId!=='list'&&!check){
//            $(window).resize().resize();
//          }
//          layer.close(this.layerIndex);
//        });
      }
    },
    created(){
      resources.PoorCoverageList({
        area:'',
        startTime:'2017-07-11',
        endTime:'2017-07-11',
        pageSize:'10',
        pageNumber:'1'}).then((data)=>{
        this.list=data.data.data.rows;
        this.repairUserListLength(data.data.data.total, 'list', true);
      });
    }
  }
</script>
