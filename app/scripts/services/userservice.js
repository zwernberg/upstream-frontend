'use strict';

/**
 * @ngdoc service
 * @name upstreamApp.userService
 * @description
 * # userService
 * Service in the upstreamApp.
 */
angular.module('upstreamApp')
  .factory('userService', function ($resource) {
      var data = $resource('http://angler.online/api/users/:id',{id: "@id"}, {
          update: {
              method: 'PUT'
          },
          follow: {
              method: 'POST',
              url: 'http://angler.online/api/users/:id/follow'
          },
          unfollow: {
              method: 'POST',
              url: 'http://angler.online/api/users/:id/unfollow'
          }
      });
      return data;
  });