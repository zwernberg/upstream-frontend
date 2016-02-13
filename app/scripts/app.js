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
    'angularMoment',
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
        templateUrl: 'views/stream.html',
        controller: 'StreamCtrl',
        controllerAs: 'stream',
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
      .when('/catch/:catchId', {
        templateUrl: 'views/catch.html',
        controller: 'CatchCtrl',
        controllerAs: 'vm',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }		
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }		
      })

      .when('/user/:userId', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }		
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/registration', {
        templateUrl: 'views/registration.html',
        controller: 'RegistrationCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout'
      })
      .when('/userprofile', {
        templateUrl: 'views/userprofile.html',
        controller: 'UserprofileCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }		
      })
      .when('/stream', {
        templateUrl: 'views/stream.html',
        controller: 'StreamCtrl',
        controllerAs: 'stream'
      })
      .otherwise({
        redirectTo: '/'
      });
    
    $mdThemingProvider.theme('default')
    .primaryPalette('grey', {
        'default': '200'
    })
    .accentPalette('blue', {
        'default': '700'
    });
  })
	.run(function(djangoAuth){
    djangoAuth.initialize('//angler.online/api/rest-auth', false);
  });
	