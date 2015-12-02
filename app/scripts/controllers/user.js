'use strict';

/**
 * @ngdoc function
 * @name upstreamApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the upstreamApp
 */
angular.module('upstreamApp')
  .controller('UserCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
