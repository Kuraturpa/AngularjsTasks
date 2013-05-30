'use strict';

angular.module('TasksApp')
.controller('UserCtrl', function ($scope, $rootScope, $location, ParseUserService) {
	$scope.user = ParseUserService.getUser();

	$scope.check = function() {
		return ParseUserService.loggedIn();
	};

	$scope.signUp = function(username, email, password) {
		ParseUserService.signUp(username, email, password, function(user, error) {
			if(error) {
				$scope.user = {};
			}
			else {
				$scope.user = user;
			}
		});
	};

	$scope.logout = function() {
		ParseUserService.logout();
		$scope.user = {};
		$rootScope.$broadcast('user:logout');
	};

	$scope.login = function(username, password) {
		ParseUserService.login(username, password, function(user, error) {
			if(error) {
				$scope.user = {};
			}
			else {
				$scope.user = ParseUserService.getUser();
			}
		});
	};
});
