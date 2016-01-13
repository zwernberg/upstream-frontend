'use strict';

/**
 * @ngdoc function
 * @name upstreamApp.controller:CatchCtrl
 * @description
 * # CatchCtrl
 * Controller of the upstreamApp
 */
angular.module('upstreamApp')
  .controller('CatchCtrl', function ($scope, catchService, userService, $resource,  Upload, $routeParams, $timeout) {
    $scope.catches = catchService.query();
	
	$scope.likePhoto = function(thisCatch){
        thisCatch.likes++;
        thisCatch.$save();
        
        
        
    }
	
   
  });
