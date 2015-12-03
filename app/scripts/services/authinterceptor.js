'use strict';

/**
 * @ngdoc service
 * @name frontendApp.authInterceptor
 * @description
 * # authInterceptor
 * Service in the frontendApp.
 */
angular.module('upstreamApp')
.factory('AuthInterceptor', function($injector, $location, $q, $window) {
  return {
		request: function(config){
			config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = $window.sessionStorage.token;
      }
      return config;
			
		},
    responseError: function responseError(rejection) {
      if (rejection.status === 401 || 403
            && rejection.config.url !== '/login') {
         $location.path("/login");
      }
      return $q.reject(rejection);
    }
  };
});
