'use strict';

angular.module('TasksApp')
	.factory('ConfigService', function () {

		// Add your Parse app key and js key
		var parseJSApikey = '';
		var parseAppKey = '';

		// Public API here
		return {
			parseJSApiKey: function () {
				return parseJSApikey;
			},
			parseAppKey: function() {
				return parseAppKey;
			}
		};
	});
