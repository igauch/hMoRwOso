/**
 * Created by twj94 on 2017/6/6.
 */

//引入此文件，注入gSide module到你的主module里,以标签<g-side>直接调用
//参数type可选，不指明默认为向下折叠的手风琴效果，只能指明一个值'right',为点击向右伸展展示效果
//config-data必选，为传入导航的数据
//数据结构为：
// {"label": "南京华苏",                //导航名字
//  "class":"howso",                   //放在li上的class
//  "iconClass":"fa fa-address-book",  //可以指定字体图标等
//  "children": [{"href":"hoswo"},     //子导航，href为路径\state
//  {}]}
//
//依赖uirouter,可根据路由初始化到激活路由的导航
//不限制导航的深度
//TODO 暂时依赖简单修改的bootstrap4，已做CDN嵌入，无需再做引用
angular.module('gSide', []).directive('gSide', function ($compile, $timeout) {
    return {
        restrict: 'EA',
        template: '<div class="g-side"><link rel="stylesheet" href="http://src.igauch.cn/GauchBootstrap.css"></div>',
        scope: {
            sideConfigData: '=configData'
        },
        replace: true,
        link: function (sp, ele, attr) {

            //构建html模板事件
            var newEle;//指定新的元素以进行下一次元素的循环插入
            var forAppendElement = function (ele, dataNameString, index, hidden, position) {
                ele.append(
                    '<ul class="nav flex-column side-' + index + ' ' + hidden +' '+position+ '">' +
                    '<li class="nav-item dropdown {{data1.class}}" ng-repeat="data1 in ' + dataNameString + ' track by $index">' +
                    '<a ng-if="data1.href" class="nav-link text-white cursor-pointer" ui-sref="{{data1.href}}" ui-sref-active="active">' +
                    '<span class="d-inline-block {{data1.iconClass}}"></span>{{data1.label}}' +
                    '</a>' +
                    '<div ng-if="!data1.href" class="nav-link text-white cursor-pointer d-flex align-items-center">' +
                    '<span class="d-inline-block {{data1.iconClass}}"></span>{{data1.label}}'+
                    '<span class="flex-1"></span>' +
                    '<span class="caretCtrl caret-right" ng-if="data1.children&&data1.children.length"></span>' +
                    '</div>' +
                    '</li>' +
                    '</ul>'
                );
                newEle = ele.find('li');
            };

            //根据激活的路由初始化展开的部分
            // var activeShowCtrl=true;
            var activeShow=function () {
                angular.element('.side-1').find('ul').hide();
                var allShowEle = $('.active').parents().filter(function () {
                    if (this.nodeName === 'UL' && this.className.indexOf('hidden') > -1) {
                        return true
                    }
                });
                angular.forEach(allShowEle,function (v) {
                    if(attr.type!=='right') {
                        angular.element(v).prev().find('.caretCtrl').removeClass('caret-right').addClass('caret');
                    }
                });
                angular.element(allShowEle).show();
            };

            //点击事件
            //每一次点击都隐藏除它下一个相邻元素外的所有比它文档节点更深的元素，再展开当前元素的下一个相邻元素
            //TODO 点击的是div||a但event实际是真实点击的元素
            ele.on('click', 'div,a', function(e){
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
                angular.element(allHidEle).slideUp("fast",function () {
                    if(attr.type!=='right'){
                        angular.forEach(allHidEle,function (v) {
                            angular.element(v).prev().find('.caretCtrl').removeClass('caret').addClass('caret-right');
                        })
                    }
                });//隐藏

                curEleNext.slideToggle('fast',function () {
                    if(attr.type!=='right') {
                        angular.element(curEle).find('.caretCtrl').toggleClass('caret caret-right');
                    }
                });//展开显示
                if(attr.type==='right'&&curEle.parent().find('.active').length){
                    // activeShowCtrl=false;
                    activeShow();
                }
                if(attr.type==='right'&&target.nodeName.toUpperCase()==='A'){
                    angular.element('.side-1').find('ul').hide();
                    // activeShowCtrl=true;
                }
            });

            var watchData = sp.$watch('sideConfigData', function (p1) {//当数据传入时执行
                if (p1) {
                    //构建html模板
                    forAppendElement(ele, 'sideConfigData', 1);//构建一个
                    var dataDept = 2;//计算出导航数据的最大深度
                    angular.forEach(p1, function (v) {
                        var str = JSON.stringify(v),//转为字符串
                            stopIndex = str.indexOf(']') > 0 ? str.indexOf(']') : undefined,//根据数组的 [ 筛选有效的深度
                            patternArr = str.substring(0, stopIndex).match(/\[/g),
                            dept = (patternArr ? patternArr.length : 0) + 3;
                        dataDept = dept > dataDept ? dept : dataDept;
                    });
                    for (var i = 2; i < dataDept; i++) {//根据数据的深度去构建对应的模板
                        forAppendElement(newEle, 'data1.children', i, 'hidden', attr.type==='right'?'position-right':'');
                    }

                    $compile(ele.contents())(sp);//append的元素需要compile

                    $timeout(function () {//compile后执行
                        if(attr.type!=='right'){
                            activeShow();
                        }
                    });

                    watchData();//销毁对传入数据的监听
                }
            });
        }
    }
});