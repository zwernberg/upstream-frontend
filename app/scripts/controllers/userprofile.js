'use strict';

/**
 * @ngdoc function
 * @name upstreamApp.controller:UserprofileCtrl
 * @description
 * # UserprofileCtrl
 * Controller of the upstreamApp
 */
angular.module('upstreamApp')
  .controller('UserprofileCtrl', function ($scope, djangoAuth, Validate, $location, $rootScope) {
    $scope.model = [{'first_name':'','last_name':'','email':'', 'bio':''}];
  	$scope.complete = false;
  	djangoAuth.profile().then(function(data){
  		$scope.model = data;
  	});
    $scope.updateProfile = function(formData, model){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.updateProfile(model)
        .then(function(data){
        	// success case
        	$location.path('/user/' + $rootScope.currentUser.id);
        },function(data){
        	// error case
        	$scope.error = data;
        });
      }
    }
  });