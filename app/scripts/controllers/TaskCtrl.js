'use strict';

angular.module('TasksApp')
	.controller('TaskCtrl', function ($scope, $routeParams, TasksService) {
		$scope.task = {};
		$scope.tasks = [];

		TasksService.getAll(function(tasks) {
			$scope.tasks = tasks;
			if(!$scope.$$phase) {
				$scope.$digest();
			}
		});

		$scope.refresh = function() {
			TasksService.getAll(function(tasks) {
				$scope.tasks = tasks;
				if(!$scope.$$phase) {
					$scope.$digest();
				}
			});
		};

		$scope.init = function() {
			$scope.getTask($routeParams.id);
			console.log($scope.task);
		};

		$scope.initNew = function() {
			$scope.task = {};
		};

		$scope.add = function(item) {
			if(typeof item !== 'undefined' && item !== '') {
				TasksService.add(item, function() {
					if(!$scope.$$phase) {
						$scope.$digest();
					}
				});
			}
			$scope.task = {};
		};

		$scope.edit = function(item) {
			console.log(item);
			TasksService.edit(item);
		};

		$scope.getTask = function(id) {
			$scope.task = TasksService.getById(id);
		};

		$scope.remove = function(id) {
			TasksService.removeById(id);
		};

	});
