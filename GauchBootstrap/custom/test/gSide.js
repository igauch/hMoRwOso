/**
 * Created by twj94 on 2017/6/6.
 */
angular.module('gSide', []).directive('gSide', function ($compile, $timeout) {
    return {
        restrict: 'EA',
        template: '<div class="g-side"><style>.g-side div,a{cursor: pointer;}</style></div>',
        scope: {
            sideConfigData: '=configData'
        },
        replace: true,
        link: function (sp, ele, attr) {

            //构建html模板事件
            var newEle;//指定新的元素以进行下一次元素的循环插入
            var forAppendElement = function (ele, dataNameString, index, hidden) {
                ele.append(
                    '<ul class="nav flex-column side-' + index + ' ' + hidden + '">' +
                    '<li class="nav-item {{data1.class}}" ng-repeat="data1 in ' + dataNameString + ' track by $index">' +
                    '<a ng-if="data1.href" class="nav-link text-white" ui-sref="{{data1.href}}" ui-sref-active="active">' +
                    '<span class="d-inline-block {{data1.iconClass}}"></span>{{data1.label}}' +
                    '</a>' +
                    '<div ng-if="!data1.href" class="nav-link text-white">' +
                    '<span class="d-inline-block {{data1.iconClass}}"></span>{{data1.label}}' +
                    '<span class="caret" ng-if="data1.children&&data1.children.length"></span>'+
                    '</div>' +
                    '</li>' +
                    '</ul>'
                );
                newEle = ele.find('li');
            };

            //点击事件
            //每一次点击都隐藏除它下一个相邻元素外的所有比它文档节点更深的元素，再展开当前元素的下一个相邻元素
            ele.on('click', 'div,a', function (e) {
                var target = e.target,
                    curEle = angular.element(target),
                    allUlEle = ele.find('ul');
                var curEleNext = curEle.next(),//当前点击的元素的下一个兄弟元素
                    curEleDept = curEle.parents().length,//当前元素距最父级元素的深度
                    allHidEle = allUlEle.filter(function () {//过滤得到所有应该隐藏的元素
                        //规则：比当前的深度更深且不是点击的元素的下一个兄弟元素
                        if (angular.element(this).parents().length >= curEleDept && this !== curEleNext[0]) {
                            return true;
                        }
                    });
                angular.element(allHidEle).slideUp("fast");//隐藏

                curEleNext.slideToggle('fast');//展开显示
            });

            var watchData = sp.$watch('sideConfigData', function (p1) {//当数据传入时执行
                if (p1) {
                    //构建html模板
                    forAppendElement(ele, 'sideConfigData', 1);//构建一个
                    var dataDept=2;//计算出导航数据的最大深度
                    angular.forEach(p1,function (v) {
                        var str=JSON.stringify(v),//转为字符串
                            stopIndex=str.indexOf(']')>0?str.indexOf(']'):undefined,//根据数组的 [ 筛选有效的深度
                            patternArr=str.substring(0,stopIndex).match(/\[/g),
                            dept=(patternArr?patternArr.length:0)+2;
                        dataDept=dept>dataDept?dept:dataDept;
                    });
                    for (var i = 2; i < dataDept; i++) {//根据数据的深度去构建对应的模板
                        forAppendElement(newEle, 'data1.children', i, 'hidden');
                    }

                    $compile(ele.contents())(sp);//append的元素需要compile

                    //根据激活的路由初始化展开的部分
                    $timeout(function () {//compile后执行
                        var allShowEle=$('.active').parents().filter(function () {
                            if (this.nodeName === 'UL' && this.className.indexOf('hidden')>-1) {
                                return true
                            }
                        });

                        angular.element(allShowEle).show();
                    });

                    watchData();//销毁对传入数据的监听
                }
            });
        }
    }
});