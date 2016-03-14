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
    //$scope.commentLimit = 3;
    
    $scope.postComment = function(currentCatch, comment){
		var commentModel = {
			'owner': {
				'id': $rootScope.currentUser.id,
				'username' : $rootScope.currentUser.username	
			},
			'text': comment
		}
	   catchService.comment({catchId:currentCatch.id},{'text':commentModel.text}, function () {
			currentCatch.comments.push(commentModel);
			currentCatch.newComment.text = '';   
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
    
    $scope.loadMoreCatches = function() {
        console.log('loading additional catches');
    }
    $scope.loadAllComments = function(thisCatch) {
        thisCatch.commentLimit = null;
    }
    $scope.collapseComments = function(thisCatch) {
        	thisCatch.commentLimit = 3;
    }    
	
   
  });
