'use strict';

/**
 * @ngdoc service
 * @name upstreamApp.currentUserService
 * @description
 * # currentUserService
 * Service in the upstreamApp.
 */
angular.module('upstreamApp')
  .service('currentUserService', function ($resource) {
    return $resource('http://162.243.237.149/api/currentuser');
  });
