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
    
	$scope.follow = function(currentUser){
        userService.follow({id: currentUser.id});     
    }
	$scope.unfollow = function(currentUser){
        userService.unfollow({id: currentUser.id});     
    }   	   
    
    
  });
