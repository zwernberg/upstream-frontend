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
      var data = $resource('http://162.243.237.149/api-token-auth/');	
      return data;
  });