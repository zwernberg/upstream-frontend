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
      return $resource('http://angler.online/api/catches/:catch',{catch: "@catch"}, {
      update: {
          method:'PUT'
          },
	like: {
		method: 'POST',
		url: 'http://angler.online/api/catches/:catch/like'
	      },
	unlike: {
		method: 'POST',
		url: 'http://angler.online/api/catches/:catch/unlike'		
	}
      });
      
  });