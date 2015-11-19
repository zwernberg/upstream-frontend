'use strict';

/**
 * @ngdoc function
 * @name upstreamApp.controller:CatchCtrl
 * @description
 * # CatchCtrl
 * Controller of the upstreamApp
 */
angular.module('upstreamApp')
  .controller('CatchCtrl', function ($scope, catchService, $resource,  Upload, $routeParams, $timeout) {
    $scope.uploadPic = function(file) {
    file.upload = Upload.upload({
      url: 'http://162.243.237.149/api/catches',
      data: {fishPhoto: file, title: $scope.title},
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
		console.log(response.data);
		$scope.catches.push(response.data);
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });	  	
	}
	
	
	
		$scope.catches = catchService.query();		
		$scope.addCatch = function(addCatch){
			$scope.newCatch = catchService.save(addCatch,function(){
				$scope.catches.push($scope.newCatch);
			});
			
		}
  });
