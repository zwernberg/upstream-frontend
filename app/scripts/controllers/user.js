'use strict';

/**
 * @ngdoc function
 * @name upstreamApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the upstreamApp
 */
angular.module('upstreamApp')
  .controller('UserCtrl', function ($scope, userService, $resource, $routeParams) {
	var user = userService.get({id: $routeParams.userId}, function() {
   		$scope.user = user;
	});
  });
