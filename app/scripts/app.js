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
    'ngMaterial',
	'LocalStorageModule'
  ])
	.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('ls');
	}])
  .config(function ($routeProvider, $httpProvider, $mdThemingProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/catch.html',
        controller: 'CatchCtrl',
        controllerAs: 'catch',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }				
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'   
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
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/registration', {
        templateUrl: 'views/registration.html',
        controller: 'RegistrationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    
    $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('orange');
  });

