'use strict';

/**
 * @ngdoc overview
 * @name upstreamApp
 * @description
 * # upstreamApp
 *
 * Main module of the application.
 */
angular
  .module('upstreamApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
		'ngFileUpload',
    'ngMaterial'
  ])
  .config(function ($routeProvider, $httpProvider, $mdThemingProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/catch.html',
        controller: 'CatchCtrl',
        controllerAs: 'catch'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/catch', {
        templateUrl: 'views/catch.html',
        controller: 'CatchCtrl',
        controllerAs: 'catch'
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl'
      })
      .when('/user/:userId', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
		$httpProvider.interceptors.push('AuthInterceptor');
    
    $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('orange');
  });

