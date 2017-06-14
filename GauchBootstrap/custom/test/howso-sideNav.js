/**
 * Created by twj94 on 2017/6/14.
 */

//引入此文件，注入hoswoSidenav module到你的主module里,以标签<g-side>直接调用
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

angular.module('hoswoSidenav', [])
    .run(['$templateCache', function (tpl) {
        //实现html模板，以利用ngInclude和ngRepeat实现树形结构数据的递归来构建html
        //因为ngRepeat的主体不一，所以不能和下面的合并，使用单一的模板
        tpl.put('hoswoSideNavTpl.html',
            '<li class="nav-item dropdown {{data.class}} bg-primary" ng-repeat="data in data.children track by $index">' +
            '<a ng-if="data.href" class="nav-link text-white cursor-pointer" ui-sref="{{data.href}}" ui-sref-active="active">' +
            '<span class="d-inline-block {{data.iconClass}}"></span>{{data.label}}' +
            '</a>' +
            '<div ng-if="!data.href" class="nav-link text-white cursor-pointer d-flex align-items-center">' +
            '<span class="d-inline-block {{data.iconClass}}"></span>{{data.label}}' +
            '<span class="flex-1"></span>' +
            '<span class="caretCtrl caret-right" ng-if="data.children&&data.children.length"></span>' +
            '</div>' +

            '<ul ng-if="data.children" class="nav flex-column {{positionRight}}" hidden ng-include="hoswoSideNavTpl"></ul>' +

            '</li>'
        );
    }])
    .directive('hoswoSidenav', function ($compile, $timeout) {
        return {
            restrict: 'EA',
            template: '<div class="g-side">' +
            '<link rel="stylesheet" href="test/howso-sideNav.css">' +

            '<ul class="nav flex-column">' +
            '<li class="nav-item dropdown {{data.class}} bg-primary" ng-repeat="data in data track by $index">' +
            '<a ng-if="data.href" class="nav-link text-white cursor-pointer" ui-sref="{{data.href}}" ui-sref-active="active">' +
            '<span class="d-inline-block {{data.iconClass}}"></span>{{data.label}}' +
            '</a>' +
            '<div ng-if="!data.href" class="nav-link text-white cursor-pointer d-flex align-items-center">' +
            '<span class="d-inline-block {{data.iconClass}}"></span>{{data.label}}' +
            '<span class="flex-1"></span>' +
            '<span class="caretCtrl caret-right" ng-if="data.children&&data.children.length"></span>' +
            '</div>' +

            '<ul ng-if="data.children" class="nav flex-column {{positionRight}}" hidden ng-include="hoswoSideNavTpl"></ul>' +

            '</li>'+
            '</ul>' +

            '</div>',
            scope: {
                data: '=configData'
            },
            replace: true,
            link: function (sp, ele, attr) {

                //用以解决字符串的拼凑问题
                sp.hoswoSideNavTpl = 'hoswoSideNavTpl.html';
                //
                sp.positionRight=attr.type === 'right'?'position-right':'';

                //根据激活的路由初始化展开的部分
                var activeShow = function () {
                    var allShowEle = $('.active').parents().filter(function () {
                        if (this.nodeName === 'UL' && this.className.indexOf('hidden') > -1) {
                            return true
                        }
                    });
                    angular.forEach(allShowEle, function (v) {
                        if (attr.type !== 'right') {
                            angular.element(v).prev().find('.caretCtrl').removeClass('caret-right').addClass('caret');
                        }
                    });
                    angular.element(allShowEle).show();
                };

                //点击事件
                //每一次点击都隐藏除它下一个相邻元素外的所有比它文档节点更深的元素，再展开当前元素的下一个相邻元素
                //TODO 点击的是div||a但event实际是真实点击的元素
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
                    angular.element(allHidEle).slideUp("fast", function () {
                        if (attr.type !== 'right') {
                            angular.forEach(allHidEle, function (v) {
                                angular.element(v).prev().find('.caretCtrl').removeClass('caret').addClass('caret-right');
                            })
                        }
                    });//隐藏

                    curEleNext.slideToggle('fast', function () {
                        if (attr.type !== 'right') {
                            angular.element(curEle).find('.caretCtrl').toggleClass('caret caret-right');
                        }
                    });//展开显示

                    if (attr.type === 'right' && curEle.parent().find('.active').length) {
                        // activeShowCtrl=false;
                        activeShow();
                    }
                    if (attr.type === 'right' && target.nodeName.toUpperCase() === 'A') {
                        // activeShowCtrl=true;
                        angular.element('.g-side>ul').find('ul').hide();
                    }
                });

                $timeout(function () {//compile后执行
                    if (attr.type !== 'right') {
                        activeShow();
                    }
                });
            }
        }
    });