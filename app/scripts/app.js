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
    'ngTouch'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
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
      .otherwise({
        redirectTo: '/'
      });
		$httpProvider.interceptors.push('AuthInterceptor');
  });

