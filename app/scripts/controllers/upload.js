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
        $scope.photoSelected = false;
        
        $scope.selectPhoto = function() {
            $scope.photoSelected = true;
        }
        
        $scope.uploadPic = function(file) {
            file.upload = Upload.upload({
                url: 'http://162.243.237.149/api/catches',
                data: {fishPhoto: file, title: $scope.title, location: $scope.location},
            });

            file.upload.then(function (response) {        
                $timeout(function () {
                    file.result = response.data;
                    console.log(response.data);
                });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });     	
        }	
  });
