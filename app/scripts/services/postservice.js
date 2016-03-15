'use strict';

/**
 * @ngdoc service
 * @name upstreamApp.postService
 * @description
 * # postService
 * Service in the upstreamApp.
 */
angular.module('upstreamApp')
  .factory('postService', function () {
		return {
		toggleComment: function(thisCatch) {
			thisCatch.commentLimit = thisCatch.commentLimit == null ? 3: null
		}			
		}

  });
