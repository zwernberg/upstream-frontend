'use strict';

/**
 * @ngdoc function
 * @name upstreamApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the upstreamApp
 */
angular.module('upstreamApp')
  .controller('UserCtrl', function ($scope, userService, currentUserService, $resource, $routeParams, $mdToast) {
	var user = userService.get({id: $routeParams.userId}, function() {
   		$scope.user = user;
	});
    
	$scope.follow = function(currentUser){
        if (user.following == false) {
            userService.follow({id: currentUser.id});
            user.following = true;
			$mdToast.show($mdToast.simple().content('You now follow ' + user.username).position('right bottom'));

        }
        else {
            userService.unfollow({id: currentUser.id});
            user.following = false;
			$mdToast.show($mdToast.simple().content('You no longer follow ' + user.username).position('right bottom'));
        }
    }
		   
    
    
  });
