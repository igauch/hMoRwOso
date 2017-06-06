/**
 * Created by twj94 on 2017/6/6.
 */
angular.module('gSide',[]).directive('gSide',function () {
    return{
        restrict: 'EA',
        templateUrl:'test/tpl.html',
        scope:{
            sideConfigData:'=configData'
        },
        replace:true,
        link: function(sp,ele,attr) {
            var headers = ["H1","H2","H3","H4","H5","H6"],
                pAndDiv=ele.find('p,div'),
                visLast=ele.find(':visible:last');

            ele.click(function(e) {
                var target = e.target,
                    name = target.nodeName.toUpperCase();

                if($.inArray(name,headers) > -1) {
                    var subItem = $(target).next();

                    //slideUp all elements (except target) at current depth or greater
                    var depth = $(subItem).parents().length;
                    var allAtDepth = pAndDiv.filter(function() {
                        if($(this).parents().length >= depth && this !== subItem.get(0)) {
                            return true;
                        }
                    });
                    $(allAtDepth).slideUp("fast");

                    //slideToggle target content and adjust bottom border if necessary
                    subItem.slideToggle("fast",function() {
                        visLast.css("border-radius","0 0 10px 10px");
                    });
                    $(target).css({"border-bottom-right-radius":"0", "border-bottom-left-radius":"0"});
                }
            });
        }
    }
});