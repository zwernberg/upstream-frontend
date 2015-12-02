'use strict';

/**
 * @ngdoc service
 * @name upstreamApp.userService
 * @description
 * # userService
 * Service in the upstreamApp.
 */
angular.module('upstreamApp')
  .factory('userService', function ($resource) {
      var data = $resource('http://162.243.237.149/api/users/:id',{id: "@id"}, {
      update:{
          method:'PUT'
          }
      });
      return data;
  });