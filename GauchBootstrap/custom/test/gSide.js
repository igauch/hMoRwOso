/**
 * Created by twj94 on 2017/6/6.
 */
angular.module('gSide', []).directive('gSide', function ($compile) {
    return {
        restrict: 'EA',
        template: '<div class="g-side"><style>.g-side div,a{cursor: pointer;}</style></div>',
        scope: {
            sideConfigData: '=configData'
        },
        replace: true,
        link: function (sp, ele, attr) {

            //构建html
            var newEle;//指定新的元素以进行下一次元素的循环插入
            var forAppendElement = function (ele, dataNameString, index) {
                ele.append(
                    '<ul class="nav flex-column side-' + index + '">' +
                    '<li class="nav-item {{data1.class}}" ng-repeat="data1 in ' + dataNameString + ' track by $index">' +
                    '<a ng-if="data1.href" class="nav-link text-white" ui-sref="{{data1.href}}" ui-sref-active="active">' +
                    '<span class="d-inline-block {{data1.iconClass}}"></span>{{data1.label}}' +
                    '</a>' +
                    '<div ng-if="!data1.href" class="nav-link text-white">' +
                    '<span class="d-inline-block {{data1.iconClass}}"></span>{{data1.label}}' +
                    '</div>' +
                    '</li>' +
                    '</ul>'
                );
                newEle = ele.find('li');
            };

            var watchData = sp.$watch('sideConfigData', function (p1) {//当数据传入时执行
                if (p1) {
                    forAppendElement(ele, 'sideConfigData', 1);
                    for (var i = 2; i < 6; i++) {//如果确实有必要可以修改i的最大值以扩展导航的深度
                        forAppendElement(newEle, 'data1.children', i);
                    }
                    $compile(ele.contents())(sp);//append的元素需要compile
                    watchData();//销毁对传入数据的监听
                }
            });



            //根据激活的路由初始化展开的部分
            // var activeEle=ele.find('.sctive'),//当前激活的元素
            //     activeEleNext=activeEle.next();//当前激活元素的下一个同胞元素



            //点击事件
            ele.click(function (e) {
                var target=e.target,
                    curEle=angular.element(target),
                    allUlEle=ele.find('ul');
                if(target.nodeName.toUpperCase()==='DIV'){
                    var curEleNext=curEle.next(),//当前点击的元素的下一个兄弟元素
                        curEleDept=curEle.parents().length,//当前元素距最父级元素的深度
                        allHidEle=allUlEle.filter(function () {//过滤所有应该隐藏的元素
                            //规则：
                            if(angular.element(this).parents().length>=curEleDept&&this!==curEleNext[0]){
                                return true;
                            }
                        });
                    angular.element(allHidEle).slideUp("fast");

                    curEleNext.slideToggle('fast');
                }
            });


            // var headers = ["H1", "H2", "H3", "H4", "H5", "H6"],
            //     pAndDiv = ele.find('p,div'),
            //     visLast = ele.find(':visible:last');
            //
            // ele.click(function (e) {
            //     var target = e.target,
            //         name = target.nodeName.toUpperCase();
            //
            //     if ($.inArray(name, headers) > -1) {
            //         var subItem = $(target).next();
            //
            //         //slideUp all elements (except target) at current depth or greater
            //         var depth = $(subItem).parents().length;
            //         var allAtDepth = pAndDiv.filter(function () {
            //             if ($(this).parents().length >= depth && this !== subItem.get(0)) {
            //                 return true;
            //             }
            //         });
            //         $(allAtDepth).slideUp("fast");
            //
            //         //slideToggle target content and adjust bottom border if necessary
            //         subItem.slideToggle("fast", function () {
            //             visLast.css("border-radius", "0 0 10px 10px");
            //         });
            //         $(target).css({"border-bottom-right-radius": "0", "border-bottom-left-radius": "0"});
            //     }
            // });
        }
    }
});