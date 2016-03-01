'use strict';

/**
 * @ngdoc function
 * @name upstreamApp.controller:CatchCtrl
 * @description
 * # CatchCtrl
 * Controller of the upstreamApp
 */
angular.module('upstreamApp')
  .controller('CatchCtrl', function ($scope, catchService, userService, currentUserService, $resource,  Upload, $routeParams, $rootScope, $timeout) {
	var vm = this;
    vm.catch = catchService.get({catchId: $routeParams.catchId});
      
    
    vm.postComment = function(comment){
		vm.newComment = {
			'owner': {
				'id': $rootScope.currentUser.id,
				'username' : $rootScope.currentUser.username	
			},
			'text': comment
		}
	   catchService.comment({catchId:vm.catch.id},{'text':vm.newComment.text}, function () {
			vm.catch.comments.push(vm.newComment);
			vm.newComment = '';   
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
