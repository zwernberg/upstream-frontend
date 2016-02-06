'use strict';

/**
 * @ngdoc function
 * @name upstreamApp.controller:StreamCtrl
 * @description
 * # StreamCtrl
 * Controller of the upstreamApp
 */
angular.module('upstreamApp')
  .controller('StreamCtrl', function ($scope, catchService, userService, currentUserService, $resource,  Upload, $routeParams, $timeout) {
    $scope.catches = catchService.query();
    
     
	
	$scope.likePhoto = function(thisCatch){
		if (thisCatch.liked){
			thisCatch.$unlike({catchId: thisCatch.id});
			thisCatch.likes -= 1;
			thisCatch.liked = false;
		}
		else{
			thisCatch.$like({catchId: thisCatch.id});
			thisCatch.likes += 1;
			thisCatch.liked = true;
		}
    }
	
   
  });
