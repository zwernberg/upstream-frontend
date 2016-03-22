'use strict';

/**
 * @ngdoc function
 * @name upstreamApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the upstreamApp
 */
angular.module('upstreamApp')
  .controller('SearchCtrl', function ($scope) {
      $scope.results = [
          {userId: 3, avatar: 'images/avatar.png', name: 'ben'},
          {userId: 2, avatar: 'images/avatar.png', name: 'werny'},
          {userId: 3, avatar: 'images/avatar.png', name: 'sarah'},
          {userId: 3, avatar: 'images/avatar.png', name: 'mandy'},
          {userId: 3, avatar: 'images/avatar.png', name: 'matt'},
          {userId: 3, avatar: 'images/avatar.png', name: 'luke'},
          {userId: 3, avatar: 'images/avatar.png', name: 'sam'},
          {userId: 3, avatar: 'images/avatar.png', name: 'samantha'},
          {userId: 3, avatar: 'images/avatar.png', name: 'samurai'},
          {userId: 3, avatar: 'images/avatar.png', name: 'huge_fisher'},
          {userId: 3, avatar: 'images/avatar.png', name: 'salmonhunter'}
      ]
  });
