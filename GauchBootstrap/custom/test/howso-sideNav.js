/**
 * Created by twj94 on 2017/6/14.
 */

angular.module('howsoSidenav', [])
    .run(['$templateCache', function (tpl) {
        //实现html模板，以利用ngInclude和ngRepeat实现树形结构数据的递归来构建html
        //因为ngRepeat的主体不一，所以不能和下面的合并，使用单一的模板
        tpl.put('howsoSidenavTpl.html',
            '<li class="list-unstyled {{data.class}} bg-primary" ng-repeat="data in data.children track by $index">' +
            '<a ng-if="data.href" class="bg-primary cursor-pointer d-block" ui-sref="{{data.href}}" ui-sref-active="active">' +
            '<span ng-if="data.iconClass" class="d-inline-block {{data.iconClass}}"></span>{{data.label}}' +
            '</a>' +
            '<div ng-if="!data.href" class="cursor-pointer d-flex align-items-center">' +
            '<span ng-if="data.iconClass" class="d-inline-block {{data.iconClass}}"></span>{{data.label}}' +
            '<span class="flex-1"></span>' +
            '<span class="caretCtrl caret-right" ng-if="data.children&&data.children.length"></span>' +
            '</div>' +

            '<ul ng-if="data.children" class="{{positionRight}}" hidden ng-include="howsoSidenavTpl"></ul>' +

            '</li>'
        );
    }])
    .directive('howsoSidenav', function ($compile, $timeout) {
        return {
            restrict: 'EA',
            template: '<div class="g-side">' +

            '<ul>' +
            '<li class="list-unstyled {{data.class}} bg-primary" ng-repeat="data in data track by $index">' +
            '<a ng-if="data.href" class="bg-primary cursor-pointern d-block" ui-sref="{{data.href}}" ui-sref-active="active">' +
            '<span ng-if="data.iconClass" class="d-inline-block {{data.iconClass}}"></span>{{data.label}}' +
            '</a>' +
            '<div ng-if="!data.href" class="cursor-pointer d-flex align-items-center">' +
            '<span ng-if="data.iconClass" class="d-inline-block {{data.iconClass}}"></span>{{data.label}}' +
            '<span class="flex-1"></span>' +
            '<span class="caretCtrl caret-right" ng-if="data.children&&data.children.length"></span>' +
            '</div>' +

            '<ul ng-if="data.children" class="{{positionRight}}" hidden ng-include="howsoSidenavTpl"></ul>' +

            '</li>'+
            '</ul>' +

            '</div>',
            scope: {
                data: '=configData'
            },
            replace: true,
            link: function (sp, ele, attr) {

                //用以解决字符串的拼凑问题
                sp.howsoSidenavTpl = 'howsoSidenavTpl.html';
                //
                sp.positionRight=attr.type === 'right'?'position-right':'';

                //根据激活的路由初始化展开的部分
                var allShowEle;
                var activeShow = function () {
                        allShowEle = $('.active').parents().filter(function () {
                        if (this.nodeName === 'UL') {
                            return true
                        }
                    });
                    angular.forEach(allShowEle, function (v) {
                        if (attr.type !== 'right') {
                            angular.element(v).prev().find('.caretCtrl').removeClass('caret-right').addClass('caret');
                        }
                        angular.element(v).prev().addClass('active');
                    });
                    angular.element(allShowEle).show();
                };

                //点击事件
                //每一次点击都隐藏除它下一个相邻元素外的所有比它文档节点更深的元素，再展开当前元素的下一个相邻元素

                ele.on('click', 'div,a', function () {
                    var curEle = angular.element(this),
                        allUlEle = ele.find('ul');
                    curEle.addClass('active');
                    var curEleNext = curEle.next(),//当前点击的元素的下一个兄弟元素
                        curEleDept = curEle.parents().length,//当前元素距最父级元素的深度
                        allHidEle = allUlEle.filter(function () {//过滤得到所有应该隐藏的元素
                            //规则：比当前的深度更深且不是点击的元素的下一个兄弟元素
                            if (angular.element(this).parents().length >= curEleDept && this !== curEleNext[0]) {
                                return true;
                            }
                        });

                    if(this.nodeName.toUpperCase() === 'A') {
                        allShowEle = angular.element(this).parents().filter(function () {
                            if (this.nodeName === 'UL') {
                                return true
                            }
                        });
                    }

                    angular.element(allHidEle).slideUp("fast", function () {
                        if (attr.type !== 'right') {
                            angular.forEach(allHidEle, function (v) {
                                angular.element(v).prev().find('.caretCtrl').removeClass('caret').addClass('caret-right');
                                angular.element(v).prev().not(angular.element(allShowEle).prev()).removeClass('active');
                                console.log(angular.element(v).prev().not(angular.element(allShowEle).prev()));
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
                    if (attr.type === 'right' && this.nodeName.toUpperCase() === 'A') {
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