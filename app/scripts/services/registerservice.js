'use strict';

/**
 * @ngdoc service
 * @name upstreamApp.registerService
 * @description
 * # registerService
 * Service in the upstreamApp.
 */
angular.module('upstreamApp')
.factory('registerService', function ($resource) {
      var data = $resource('http://162.243.237.149/rest-auth/registration');	
      return data;
  });
