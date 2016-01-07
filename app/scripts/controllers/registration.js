'use strict';

/**
 * @ngdoc function
 * @name upstreamApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the upstreamApp
 */
angular.module('upstreamApp')
  .controller('RegistrationCtrl', function ($scope, loginService, $http, $window, $location, registerService) {
		$scope.registerUser = function () {
			$scope.register = registerService.save({'username': $scope.username,
			'password1': $scope.password1,'password2': $scope.password2},function(res){
			}, 
			function(successResult) {	 
						$location.path("/");
			}, function(errorResult) {
				// do something on error
				if(errorResult.status === 404) {            
				}
			});
		};
  });