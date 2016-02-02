'use strict';

/**
 * @ngdoc function
 * @name upstreamApp.controller:CatchCtrl
 * @description
 * # CatchCtrl
 * Controller of the upstreamApp
 */
angular.module('upstreamApp')
  .controller('CatchCtrl', function ($scope, catchService, userService, currentUserService, $resource,  Upload, $routeParams, $timeout) {
    $scope.catches = catchService.query();
    
    currentUserService.get( 
        function (currentUser) {
            $scope.currentUser = currentUser;
    });
     
	
	$scope.likePhoto = function(thisCatch){
		thisCatch.likes += thisCatch.liked ? -1 : 1
		thisCatch.liked = !thisCatch.liked;
        thisCatch.$like({catch: thisCatch.id});     
    }
	
   
  });
