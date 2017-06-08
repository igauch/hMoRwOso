/**
 * Created by twj94 on 2017/6/6.
 */
angular.module('myApp', ['ui.router', 'gSide'])
    .config(function ($controllerProvider, $urlRouterProvider, $stateProvider) {
        $urlRouterProvider.when('', '/howso');

        $stateProvider
            .state('howso', {
                url: '/howso',
                template: '<h1>welcome howso!</h1>'
            })
            .state('howso1', {
                url: '/howso1',
                template: '<h1>welcome howso1!</h1>'
            })
            .state('howso2', {
                url: '/howso2',
                template: '<h1>welcome howso2!</h1>'
            })
            .state('howso3', {
                url: '/howso3',
                template: '<h1>welcome howso3!</h1>'
            })
            .state('howso4', {
                url: '/howso4',
                template: '<h1>welcome howso4!</h1>'
            })
            .state('howso5', {
                url: '/howso5',
                template: '<h1>welcome howso5!</h1>'
            })
            .state('howso6', {
                url: '/howso6',
                template: '<h1>welcome howso6!</h1>'
            })
            .state('howso7', {
                url: '/howso7',
                template: '<h1>welcome howso7!</h1>'
            })
            .state('howso8', {
                url: '/howso8',
                template: '<h1>welcome howso8!</h1>'
            })
            .state('howso9', {
                url: '/howso9',
                template: '<h1>welcome howso9!</h1>'
            })
    })
    .controller('myCtrl', ['$scope', '$http', function (sp, http) {
        http.get('test/data.json').then(function (res) {
            sp.sideConfigData = res.data.data;
        });
    }]);