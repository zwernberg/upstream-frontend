'use strict';

/**
 * @ngdoc service
 * @name frontendApp.loginService
 * @description
 * # loginService
 * Service in the frontendApp.
 */
angular.module('upstreamApp')
.factory('loginService', function ($resource) {
      var data = $resource('http://192.168.1.104:8000/api-token-auth/');	
      return data;
  });