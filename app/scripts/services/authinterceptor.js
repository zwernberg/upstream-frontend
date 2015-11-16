'use strict';

/**
 * @ngdoc service
 * @name frontendApp.authInterceptor
 * @description
 * # authInterceptor
 * Service in the frontendApp.
 */
angular.module('upstreamApp')
.factory('AuthInterceptor', function($injector, $location, $q) {
  return {
    responseError: function responseError(rejection) {
      if (rejection.status === 401
            && rejection.config.url !== '/login') {
         $location.path("/login");
      }
      return $q.reject(rejection);
    }
  };
});
