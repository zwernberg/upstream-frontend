'use strict';

/**
 * @ngdoc function
 * @name upstreamApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the upstreamApp
 */
angular.module('upstreamApp')
  .controller('UserCtrl', function ($scope, userService, currentUserService, $resource, $routeParams) {
	var user = userService.get({id: $routeParams.userId}, function() {
   		$scope.user = user;
	});
    
    currentUserService.get( 
        function (currentUser) {
            $scope.currentUser = currentUser;
    });
    
    
    
  });
