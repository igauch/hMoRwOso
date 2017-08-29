<template>
  <div class="d-flex flex-column" style="height: 100%">
    <div class="selection">
      <div class="a"></div>
    </div>

    <div class="container-fluid mainViewContent flex-1 d-flex flex-column">
      <div class="row d-flex" style="height: 67.4%">
        <div class="left-1 d-flex flex-column">
          <div class="panel panel-default d-flex flex-column" style="height: 54%">
            <div class="panel-heading">网络覆盖占比概况
              <span class="pull-right icon icon-alert" @click="layer('#netAlert',$event)"></span>
            </div>
            <div class="panel-body flex-1 charts" style="height: 30px;">
              <div id="radar">
                <echarts :option="echartsOptionsRadar"></echarts>
              </div>
            </div>
          </div>
          <div class="panel panel-default flex-1 d-flex flex-column">
            <div class="panel-heading">小区弱覆盖分析</div>
            <div class="panel-body flex-1 charts" style="height: 0;">
              <div id="gauge">
                <echarts :option="echartsOptionsGauge"></echarts>
              </div>
            </div>
          </div>
        </div>
        <div class="left-2 gis">
          <div class="panel panel-default d-flex flex-column" style="height: 100%;">
            <div class="panel-heading">网络弱覆盖热力分析</div>
            <div class="panel-body flex-1" id="gis">
              <!--<iframe name="gis" iframe-onload="iframeLoaded()" align="center" width="100%" height="100%"
                      src="gis/heatmap.html" mce_src="gis/heatmap.html" scrolling="no" frameborder="none"></iframe>-->
            </div>
          </div>
        </div>
        <div class="left-3 flex-1 d-flex flex-column" style="width: 50px;">
          <div class="panel panel-default flex-1 d-flex flex-column">
            <div class="panel-heading">弱覆盖小区TOP5</div>
            <div class="panel-body flex-1 charts" style="height: 0">
              <div id="minPlot">
                <echarts :option="echartsOptionsMinPlot"></echarts>
              </div>
            </div>
          </div>
          <div class="panel panel-default flex-1 d-flex flex-column">
            <div class="panel-heading">过覆盖小区TOP5</div>
            <div class="panel-body flex-1 charts" style="height: 0;">
              <div id="maxPlot">
                <echarts :option="echartsOptionsMaxPlot"></echarts>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row d-flex row-2 flex-1" style="height: 50px">
        <div class="left-1">
          <div class="panel panel-default d-flex flex-column">
            <div class="panel-heading">重点区域网络覆盖情况
              <span class="pull-right icon icon-alert" ng-click="layer('#emphasisAlert',$event)"></span>
            </div>
            <div class="panel-body flex-1 charts" style="height: 0;">
              <div id="emphasis">
                <echarts :option="echartsOptionsEmphasis"></echarts>
              </div>
            </div>
          </div>
        </div>
        <div class="left-2 line">
          <div class="panel panel-default d-flex flex-column">
            <div class="panel-heading">近7天网络覆盖趋势</div>
            <div class="panel-body flex-1" id="line">
              <echarts :option="echartsOptionsLine"></echarts>
            </div>
          </div>
        </div>
        <div class="left-3 flex-1">
          <div class="panel panel-default d-flex flex-column">
            <div class="panel-heading">重叠覆盖度小区TOP5</div>
            <div class="panel-body flex-1 charts" style="height: 10px;">
              <div id="emphasisTop">
                <echarts :option="echartsOptionsEmphasisTop"></echarts>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--弹出框-->
    <!--网络覆盖占比说明-->
    <div id="netAlert" class="layer">
      <p><strong>弱覆盖率：</strong>弱覆盖率*100</p>
      <p><strong>重叠覆盖率：</strong>重叠覆盖率*100</p>
      <p><strong>过覆盖率：</strong>过覆盖小区比例*100</p>
      <p><strong>弱覆盖小区占比：</strong>弱覆盖小区数量 / 总小区数量*100</p>
      <p><strong>重叠覆盖小区占比：</strong>重叠覆盖小区数量 / 总小区数量*100</p>
      <p><strong>过覆盖小区占比：</strong>过覆盖小区数量 / 总小区数量*100</p>
    </div>

    <!--重点区域网络覆盖说明-->
    <div id="emphasisAlert" class="layer">
      <p>重点区域目前为指定的五个区域，计算五个区域的网络覆盖率，计算规则为：</p>
      <p>区域网络覆盖率(%) = RSRP>=-110的采样点数 / 区域所有覆盖小区总采样点数*100</p>
    </div>
  </div>
</template>

<script>
  import echarts from '@/components/echarts'

  export default {
    name: 'networkCoverOverview',
    components: {
      echarts: echarts
    },
    data() {
      return {
        echartsOptionsLine: {},
        echartsOptionsEmphasis: {},
        echartsOptionsEmphasisTop: {},
        echartsOptionsMinPlot: {},
        echartsOptionsMaxPlot: {},
        echartsOptionsGauge: {},
        echartsOptionsRadar: {},
        echartsGroup: {
          //雷达图
          radar: function (indicator, data) {
            this.echartsOptionsRadar = !(data && data.length) ? noDataOption : {
              baseOption: {
                tooltip: {
                  trigger: 'item'
                },
                radar: {
                  indicator: indicator,
                  name: {
                    textStyle: {
                      color: '#717171'
                    }
                  },
                  radius: 60
                },
                series: [{
                  type: 'radar',
                  data: [
                    {
                      value: data,
                      name: '网络覆盖占比'
                    }
                  ],
                  itemStyle: {
                    normal: {
                      color: '#f85819',
                      borderWidth: 1
                    }
                  },
                  areaStyle: {
                    normal: {
                      opacity: 0.2
                    }
                  }
                }]
              },
              media: [{
                query: {
                  maxHeight: 255
                },
                option: {
                  radar: {
                    radius: 50
                  }
                }
              }]
            };
          },
          //仪表图
          gauge: function (data) {
            this.echartsOptionsGauge = !(data.value || data.value === 0) ? noDataOption : {
              baseOption: {
                tooltip: {
                  formatter: '{a} <br> {b} : {c}%'
                },
                series: [
                  {
                    name: this.activeVendorName,
                    type: 'gauge',
                    radius: '60%',
                    center: ['50%', '52%'],
                    title: {
                      show: false
                    },
                    detail: {
                      formatter: '{value}%',
                      textStyle: {
                        fontSize: 18
                      },
                      offsetCenter: [0, '55%']
                    },
                    max: 20,
                    splitNumber: 4,
                    data: data,
                    axisLine: {
                      show: false,
                      lineStyle: {
                        color: [[0.2, '#208bcf'], [0.8, '#208bcf'], [1, '#208bcf']],
                        width: 5,
                        textStyle: {
                          fontSize: 11
                        }
                      }
                    },
                    axisTick: {            // 坐标轴小标记
                      length: '10%',        // 属性length控制线长
                      lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                      }
                    },
                    splitLine: {
                      lineStyle: {
                        width: 5,
                        color: '#ffffff'
                      },
                      length: '10%'
                    },
                    itemStyle: {
                      normal: {
                        borderColor: '#ffffff'
                      }
                    },
                    pointer: {
                      length: '50%'
                    }
                  }
                ]
              },
              media: [{
                query: {
                  maxHeight: 210
                },
                option: {
                  series: [{
                    radius: '70%',
                    detail: {
                      textStyle: {
                        fontSize: 14
                      }
                    }, axisLine: {
                      lineStyle: {
                        width: 2
                      }
                    }
                  }]
                }
              }]
            };
          },
          //弱覆盖小区TOP5
          minPlot: function (id, tooplitname, dataAxis, data, dataShadow, unit) {
            let data = data.reverse(),
              dataAxis = dataAxis.reverse();
            let labelData = $.map(data, function (v) {
              return v + unit;
            });
            let height = $('#' + id).parent().height();
            let optons = !(data && data.length) ? noDataOption : {
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: '' + tooplitname + '<br />{b1}: {c1}' + unit
              },
              grid: {
                left: 140,
                right: 60,
                top: height * 0.2 + 14,
                bottom: height * 0.2 + 14 + (5 - data.length) * (height - 28) / 5
              },
              yAxis: [
                {
                  data: dataAxis,//类目值
                  axisLabel: {
                    textStyle: {
                      color: '#333'
                    },
                    formatter: function (value) {
                      if (value.length > 10) {
                        return value.substr(0, 10) + '...'
                      } else {
                        return value;
                      }
                    }
                  },
                  axisTick: {
                    show: false
                  },
                  axisLine: {
                    show: false
                  },
                  position: 'left',
                  z: 10
                }, {
                  data: labelData,
                  position: 'right',
                  axisLabel: {
                    textStyle: {
                      color: '#333'
                    }
                  },
                  axisTick: {
                    show: false
                  },
                  axisLine: {
                    show: false
                  },
                  z: 10
                }
              ],
              xAxis: {
                show: false
              },
              series: [{
                type: 'bar',
                itemStyle: {
                  normal: {
                    color: '#f0f0f0',
                    barBorderRadius: 5
                  }
                },
                barGap: '-100%',
                barCategoryGap: 20,
                data: dataShadow,
                animation: false
              }, {
                type: 'bar',
                itemStyle: {
                  normal: {
                    barBorderRadius: 4,
                    color: function () {
                      return {'minPlot': "#0886fc", 'maxPlot': "#0c98e2", 'emphasisTop': "#0fa8cc"}[id];
                    }
                  }
                },
                barGap: '-100%',
                barCategoryGap: height > 210 ? 20 : 10,
                data: data
              }]
            };
            switch (id) {
              case 'minPlot':
                this.echartsOptionsMinPlot = optons;
                break;
              case 'maxPlot':
                this.echartsOptionsMaxPlot = optons;
                break;
              case 'emphasisTop':
                this.echartsOptionsEmphasisTop = optons;
                break;
            }
          },
          //重点区域覆盖情况
          emphasis: function (xAxisData, data) {
            let height = $('#emphasis').parent().height(),
              width = $('#emphasis').parent().width();
            this.echartsOptionsEmphasis = !(data && data.length) ? noDataOption : {
              title: {
                show: true,
                text: '覆盖率(%)',
                padding: [5, 10],
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: 11,
                  color: '#717171'
                },
                top: height * 0.23
              },
              tooltip: {
                trigger: 'item',
                formatter: '{b} <br> {a} : {c}%'
              },
              grid: {
                left: '-15',
                right: '15',
                top: height * 0.4,
                bottom: height * 0.23,
                containLabel: true
              },
              xAxis: {
                data: xAxisData,
                axisTick: {
                  show: false
                },
                axisLine: {
                  lineStyle: {
                    color: '#dbdbdb',
                    width: 1//这里是为了突出显示加上的
                  }
                },
                axisLabel: {
                  textStyle: {
                    fontSize: 10,
                    color: '#717171'
                  },
                  interval: 0,
                  formatter: function (value) {
                    if (width < 316 && value.length > 4) {
                      return value.substr(0, 3) + '...'
                    } else if (value.length > 5) {
                      return value.substr(0, 4) + '...';
                    } else {
                      return value;
                    }
                  }
                }
              },
              yAxis: {
                show: false,
                max: 100
              },
              series: [{
                type: 'bar',
                name: '覆盖率',
                data: data,
                barWidth: 18,
                label: {
                  emphasis: {
                    formatter: '{c}%'
                  },
                  normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: '#404040'
                    },
                    formatter: '{c}%'
                  }
                },
                barGap: '70%',
                itemStyle: {
                  normal: {
                    barBorderRadius: 4,
                    color: function (params) {
                      let colorList = ['#4d9cf5', '#f5a814', '#70c218', '#38a8d7', '#fc8956'];
                      return colorList[params.dataIndex];
                    }
                  },
                  emphasis: {
                    barBorderRadius: 2
                  }
                }
              }]
            };
          },
          //曲线图
          line: function (xAxisData, data) {
            let check = 0;
            $.map(data, function (v) {
              check += v.data && v.data.length ? 1 : 0;
            });
            this.echartsOptionsLine = !check ? noDataOption : {
              tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                  let list = $.map(params, function (v) {
                      return v.seriesName + ':' + v.value + (v.value && '%');
                    }),
                    key = params[0].dataIndex;
                  return fullTimeArr[key] + '<br>' + list.join('<br>');
                }
              },
              legend: {
                data: ['重叠覆盖率', '过覆盖率', '弱覆盖率'],
                //icon: "line",
                top: 0
              },
              grid: {
                left: '3%',
                right: '44',
                bottom: '3%',
                top: 38,
                containLabel: true
              },
              xAxis: {
                type: 'category',
                name: '时间',
                nameTextStyle: {
                  color: '#717171'
                },
                boundaryGap: false,
                axisTick: {
                  show: false
                },
                axisLine: {
                  lineStyle: {
                    color: '#dbdbdb'
                  }
                },
                axisLabel: {
                  textStyle: {
                    color: "#717171"
                  }
                },
                data: xAxisData
              },
              yAxis: {
                type: 'value',
                name: '覆盖率(%)',
                nameTextStyle: {
                  color: '#717171'
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  formatter: '{value}%',
                  textStyle: {
                    color: "#717171"
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: '#dbdbdb'
                  }
                },
                splitLine: {
                  show: false
                },
                splitNumber: 2
              },
              series: data
            };
          }
        },
        echartsDomArr: ['#radar', '#gauge', '#minPlot', '#maxPlot', '#emphasis', '#line', '#emphasisTop'],
        once: true,
        fullTimeArr: []
      }
    },
    methods: {
      //切换厂商事件
      switchVendor: function (vendor) {
//        let layerLoadIndex = Tool.layerLoad();
        sp.activeVendor = vendor.vendorCode;
        sp.activeVendorName = vendor.vendorName;
        fullTimeArr = [];
        //请求图表原数据
        let chartPromise = this.$http.post('resources/netOverlayProfile/getBasicInfo', $.param({
            time: sp.getyesterdayTime,
            vendorCode: vendor.vendorCode
          })).then(function (res) {
            if (res.data.resultCode === 1) {
              angular.forEach(res.data.data[0], function (v, k) {
                switch (k) {
                  case 'keyAreaProfile'://重点区域网络覆盖情况
                    let data = [],
                      name = [],
                      assistData = [];
                    angular.forEach(v.data, function (vv, kk) {
                      let key = v.keyAreaName[kk];
                      assistData[kk] = {key: key, data: vv};
                    });
                    assistData = filter('orderBy')(assistData, 'data');
                    angular.forEach(assistData, function (vv) {
                      name.push(vv.key);
                      data.push(vv.data);
                    });
                    echartsGroup.emphasis(name, data);
                    break;
                  case 'netOverlayTrend'://近7天网络覆盖趋势
                    let data = [],
                      time = $.map(v.time, function (vv) {
                        let strArr = vv.split('-');
                        fullTimeArr.push(strArr[0] + '/' + strArr[1] + '/' + strArr[2]);
                        return strArr[1] + '/' + strArr[2];
                      }),
                      colors = {'重叠覆盖率': '#0686b8', '过覆盖率': '#1f9c3b', '弱覆盖率': '#e51111'};
                    angular.forEach(v.data, function (vv) {
                      data.push({
                        name: vv.name,
                        type: 'line',
                        smooth: true,
                        symbolSize: 3,
                        itemStyle: {
                          normal: {
                            color: colors[vv.name]
                          }
                        },
                        lineStyle: {
                          color: colors[vv.name],
                          width: 1
                        },
                        //hoverAnimation: false,
                        data: vv.data
                      });
                    });
                    echartsGroup.line(time, data);
                    break;
                  case 'poorCoverageTOP5'://弱覆盖小区TOP5
                    let data = [], dataShadow = [];
                    let tooplitname = '弱覆盖率';
                    angular.forEach(v.data, function (vv) {
                      data.push(vv);
                      dataShadow.push(100);
                    });
                    echartsGroup.minPlot('minPlot', tooplitname, v.cellName, data, dataShadow, '%');
                    break;
                  case 'overshootingAnalysis'://小区弱覆盖分析
                    echartsGroup.gauge({
                      value: v.value,
                      name: '弱覆盖率'
                    });
                    break;
                  case 'overshootingTOP5'://过覆盖小区TOP5
                    let tooplitname = '过覆盖影响小区数';
                    let dataShadow = [];
                    let iMax = v.data[0] * 1 + ((v.data[0] - v.data[v.data.length - 1]) / 3);
                    angular.forEach(v.data, function () {
                      dataShadow.push(iMax)
                    });
                    echartsGroup.minPlot('maxPlot', tooplitname, v.cellName, v.data, dataShadow, '个');
                    break;
                  case 'overlappingCverageTOP5'://重叠覆盖度小区TOP5
                    let data = [], dataShadow = [];
                    let tooplitname = '邻区数大于等于3的重叠覆盖度';
                    angular.forEach(v.data, function (vv) {
                      data.push(vv);
                      dataShadow.push(100);
                    });
                    echartsGroup.minPlot('emphasisTop', tooplitname, v.cellName, data, dataShadow, '%');
                    break;
                  case 'proportionProfile'://网络覆盖占比概况
                    let indicator = [],
                      data = [],
                      max = 1;
                    angular.forEach(v.data, function (vv) {
                      data.push(vv);
                      vv = vv * 1;
                      max = vv > max ? vv : max;
                    });
                    max = max * 6 / 5;
                    angular.forEach(v.types, function (vv) {
                      indicator.push({name: vv, max: max});
                    });
                    echartsGroup.radar(indicator, data);
                    break;
                }
              });
            } else {
              layer.msg(res.data.resultMessage || res.data);
            }
            timeout(function () {
              chartsResize();
            });
            window.onresize = chartsResize;
          }, function (res) {
            layer.msg('请求图表数据接口出错 , ' + res.statusText);
            angular.forEach(echartsGroup, function (v, k) {
              if (k === 'minPlot') {
                echartsGroup[k]('minPlot');
                echartsGroup[k]('maxPlot');
                echartsGroup[k]('emphasisTop');
              } else {
                echartsGroup[k]();
              }
            })
          }),
          //请求热力图数据
          gisPromise = once && http.post(sp.domain + '/netOverlayProfile/getThermodynamicDiagram', $.param({
            time: sp.getyesterdayTime,
            vendorCode: sp.activeVendor
          })).then(function (res) {
            if (res.data.resultCode === 1) {
              let data = [];
              angular.forEach(res.data.data, function (v) {
                data.push({
                  lon: v.lng,
                  lat: v.lat,
                  azimuth: v.azimuth,
                  value: v.poorCoveragePercentage
                })
              });
              let wc = sp.$watch('gisLoaded', function (v) {
                v && gis.window.setHeatData(data) && wc();
              });
              once = false;
            } else {
              layer.msg(res.data.resultMessage);
            }
          }, function (res) {
            layer.msg('请求热力图数据接口出错 , ' + res.statusText);
          });
        q.all([gisPromise, chartPromise]).then(function () {
          layer.close(layerLoadIndex);
        });
      };

  //初始化开始
  Pool.vendorList().then(function (res) {
    sp.vendorList = res.data;
    for (let i = 0, len = sp.vendorList.length; i < len; i++) {
      if (sp.vendorList[i].vendorCode === 'huawei') {
        sp.vendorList.unshift(sp.vendorList[i]);
        sp.vendorList.splice(i + 1, 1);
        sp.switchVendor(sp.vendorList[0]);
        return false;
      }
    }
  }, function (res) {
    layer.msg(res.resultMessage);
  })
  }
  }
</script>

<style lang="scss">
  .panel-body {
    padding: 0;
  }

  .selection {
    .btn-group {
      margin-top: -4px;
    }
    .btn {
      width: 80px;
    }
  }

  .mainViewContent {
    margin: 8px 0;
    .left-1 {
      width: 24.9%;
    }
    .left-2 {
      width: 45.8%;
      margin: 0 8px 8px;
    }
    .row-2 {
      .panel {
        height: 100%;
      }
      .left-2 {
        margin-bottom: 0;
      }
    }
  }

  //charts
  .charts {
    overflow: hidden;
    position: relative;
    & > div {
      height: 140%;
      position: absolute;
      top: -20%;
      width: 100%;
    }
  }

  .icon {
    display: inline-block;
    height: 14px;
    width: 14px;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: center;
    &.icon-alert {
      margin-top: 3px;
      /*background-image: url("../src/img/alert.png");*/
      position: relative;
      z-index: 9999999;
      &.active {
        /*background-image: url("../src/img/alerted.png");*/
      }
    }
  }

  .layer {
    p {
      line-height: 24px;
    }
  }

  .layui-layer {
    .layui-layer-title {
      padding-left: 15px;
    }
    .layui-layer-content {
      padding: 15px;
    }
  }

  .topArrow {
    position: absolute;
    top: -6px;
    left: 215px;
    transform: rotate(180deg);
    /*background: url("../src/img/toggleArrowChecked.png");*/
    height: 8px;
    width: 10px;
  }
</style>
