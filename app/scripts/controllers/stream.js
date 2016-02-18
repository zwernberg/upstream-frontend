'use strict';

/**
 * @ngdoc function
 * @name upstreamApp.controller:StreamCtrl
 * @description
 * # StreamCtrl
 * Controller of the upstreamApp
 */
angular.module('upstreamApp')
  .controller('StreamCtrl', function ($scope, $rootScope, catchService, userService, currentUserService, $resource,  Upload, $routeParams, $timeout) {
    $scope.catches = catchService.query();
	$scope.newComment = '';
    $scope.postComment = function(currentCatch, comment){
		$scope.newComment = {
			'owner': {
				'id': $rootScope.currentUser.id,
				'username' : $rootScope.currentUser.username	
			},
			'text': comment
		}
	   catchService.comment({catchId:currentCatch.id},{'text':$scope.newComment.text}, function () {
			currentCatch.comments.push($scope.newComment);
			$scope.newComment = '';   
	   });
   }   
	
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
