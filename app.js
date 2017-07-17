var app = angular.module('cleaner', ['ngRoute', 'firebase', 'ngSanitize', 'ui.select', 'toaster', 'angular-loading-bar', 'angularMoment', 'ui.bootstrap', 'ngCookies', 'ngAnimate', 'ngRateIt', 'oc.lazyLoad', 'ui.router', 'ngFileUpload','checklist-model','firebase']);

// var site_url = document.location.origin;
// if (site_url === 'http://cleaner.dev')
//     site_url = 'http://project-demos.com/repair';
var api_base_url = "http://project-demos.com/repair/api/web/v1";
app.run(function ($rootScope, $compile, $location, $http, toaster, $cookies, $window) {
    $rootScope.api_img_url = "http://project-demos.com/repair/common/upload/";

    if ($cookies.get('auth_token') && $cookies.get('id') && $cookies.get('role')) {
        //console.log("Successfully Getting Aut role status and ID");
        $rootScope.auth_token = $cookies.get('auth_token');
        $rootScope.id = $cookies.get('id');
        $rootScope.role = $cookies.get('role');
        $rootScope.is_loggedin = true;
    }
    else {
        //console.log('No cookie found');
    }
    $rootScope.logout = function () {
        $window.location.reload();
        $cookies.remove('auth_token');
        $cookies.remove('id');
        $cookies.remove('role');
        $location.path('/login');
        //console.log("Logout Successfully");

        $rootScope.auth_token = $cookies.get('auth_token');
        $rootScope.role = $cookies.get('role');
        $rootScope.status = $cookies.get('status');
        $rootScope.id = $cookies.get('id');

        $rootScope.is_loggedin = false;
    };

});
app.config(['$stateProvider', '$httpProvider', '$locationProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider','$qProvider',
    function ($stateProvider, $httpProvider, $locationProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider,$qProvider) {

        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;
       
       $qProvider.errorOnUnhandledRejections(false);

    }]);