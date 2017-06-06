/**
 * Created by twj94 on 2017/6/6.
 */
angular.module('myApp', ['ui.router', 'gSide']).controller('myCtrl', ['$scope', '$http', function (sp, http) {
    http.get('test/data.json').then(function (res) {
        sp.sideConfigData = res.data.data;
    });
}]);