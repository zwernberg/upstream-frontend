'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the frontendApp
 */
angular.module('upstreamApp')
  .controller('LoginCtrl', function ($scope, loginService, $location, $http, $resource) {
		$scope.username = '';
		$scope.password = '';
		var data = {
			'username': $scope.username,
			'password': $scope.password
		};
		$scope.loginUser = function () {
			$scope.login = loginService.save({'username': $scope.username,
			'password': $scope.password},function(res){
				var token = "token " + res.token;
          		$http.defaults.headers.common['Authorization'] = token;
				$location.path("/");
			});
		}
  });