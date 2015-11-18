'use strict';

/**
 * @ngdoc service
 * @name frontendApp.workoutService
 * @description
 * # workoutService
 * Service in the frontendApp.
 */
angular.module('upstreamApp')
.factory('catchService', function ($resource) {
      var data = $resource('http://192.168.1.104:8000/api/catches/:catch',{catch: "@catch"}, {
      update:{
          method:'PUT'
          }
      });
      return data;
  });