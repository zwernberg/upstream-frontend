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
      var data = $resource('http://127.0.0.1:8000/api-token-auth/');	
      return data;
  });