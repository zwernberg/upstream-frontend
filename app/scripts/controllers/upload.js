'use strict';

/**
 * @ngdoc function
 * @name upstreamApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the upstreamApp
 */
angular
    .module('upstreamApp')
    .controller('UploadCtrl', function ($scope, catchService, $resource,  Upload, $routeParams, $timeout, $location) {
        $scope.photoSelected         = false;
        $scope.photoDetailsCompleted = false;
        
        $scope.selectPhoto = function() {
            $scope.photoSelected = true;
        }
        $scope.completePhotoDetails = function() {
            $scope.photoSelected = false;
            $scope.photoDetailsCompleted = true;
        }
        $scope.unCompletePhotoDetails = function() {
            $scope.photoSelected = true;
            $scope.photoDetailsCompleted = false;
        }                 
        
        $scope.uploadPic = function(file) {
            file.upload = Upload.upload({
                url: 'http://162.243.237.149/api/catches',
                data: {fishPhoto: file, title: $scope.title, location: $scope.location, length: $scope.length},
            });

            file.upload.then(function (response) {        
                $timeout(function () {
                    file.result = response.data;
					$location.path("/");
                });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });     	
        }
        
        $scope.tags = ['flopfriday', 'lunkers', 'great outdoors'];	
  });
