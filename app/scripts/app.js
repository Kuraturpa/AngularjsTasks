'use strict';

angular.module('TasksApp', [])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'TaskCtrl'
			})
			.when('/task/:id', {
				templateUrl: 'views/task.html',
				controller: 'TaskCtrl'
			})
			.when('/task/:id/edit', {
				templateUrl: 'views/editTask.html',
				controller: 'TaskCtrl'
			})
			.when('/user/', {
				templateUrl: 'views/user.html',
				controller: 'UserCtrl'
			})
			.when('/user/login', {
				templateUrl: 'views/login.html',
				controller: 'UserCtrl'
			})
			.when('/user/signup', {
				templateUrl: 'views/signup.html',
				controller: 'UserCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
