'use strict';

/**
 * @ngdoc service
 * @name frontendApp.workoutService
 * @description
 * # workoutService
 * Service in the frontendApp.
 */
angular.module('upstreamApp')
.factory('catchService', function ($resource, $http) {
		// $http.defaults.transformResponse.push(function(data){
		// 	if(data && data.results){
		// 		return data.results;
		// 	}
		// });
	return $resource('http://angler.online/api/catches/:catch',{catch: "@catch"}, {
		query: {
			isArray: true,
			method: 'GET',
			params: {},
			transformResponse: function (data) {
				return angular.fromJson(data).results
			}
		},	  
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