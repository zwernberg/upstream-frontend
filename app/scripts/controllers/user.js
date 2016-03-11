'use strict';

/**
 * @ngdoc function
 * @name upstreamApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the upstreamApp
 */
angular.module('upstreamApp')
  .controller('UserCtrl', function ($scope, userService, currentUserService, $resource, $routeParams, $mdToast, $location, djangoAuth) {
	var user = userService.get({id: $routeParams.userId}, function() {
   		$scope.user = user;
	});
    
	$scope.follow = function(currentUser){
        if (user.is_following == false) {
            userService.follow({id: currentUser.id});
            user.is_following = true;
            user.followers++;
			$mdToast.show($mdToast.simple().content('You now follow ' + user.username).position('right bottom'));

        }
        else {
            userService.unfollow({id: currentUser.id});
            user.is_following = false;
            user.followers--;
			$mdToast.show($mdToast.simple().content('You no longer follow ' + user.username).position('right bottom'));
        }
    }
    
    $scope.confirmLogout = function(){
        var toast = $mdToast.simple()
            .content('Are you sure you want to log out?')
            .action('OK')
            .highlightAction(false)
            .position('center top');
        $mdToast.show(toast).then(function(response) {
        if ( response == 'ok' ) {
            djangoAuth.logout()
                .then(function () {
                    $location.path("/login");
                })
        }
        });        
    }
		   
    
    
  });
