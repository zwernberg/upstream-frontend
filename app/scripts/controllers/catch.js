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
	var vm = this;
    vm.catch = catchService.get({catchId: $routeParams.catchId});
    
     
	
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
