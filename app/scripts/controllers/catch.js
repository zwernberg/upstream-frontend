'use strict';

/**
 * @ngdoc function
 * @name upstreamApp.controller:CatchCtrl
 * @description
 * # CatchCtrl
 * Controller of the upstreamApp
 */
angular.module('upstreamApp')
  .controller('CatchCtrl', function ($scope, catchService, $resource, $routeParams) {
	  	
		$scope.catches = catchService.query();		
		$scope.addCatch = function(addCatch){
			$scope.newCatch = catchService.save(addCatch,function(){
				$scope.catches.push($scope.newCatch);
			});
			
		}
  });
