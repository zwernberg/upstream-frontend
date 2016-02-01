'use strict';

/**
 * @ngdoc function
 * @name upstreamApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the upstreamApp
 */
angular.module('upstreamApp')
  .controller('LogoutCtrl', function ($scope, $location, djangoAuth) {
    djangoAuth.logout()
		.then(function(){
			$location.path("/login");
		})
  });
