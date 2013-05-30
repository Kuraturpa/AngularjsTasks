'use strict';

angular.module('TasksApp')
	.factory('TasksService', function ($rootScope, ParseUserService) {

	var tasks = [];
	var Task = Parse.Object.extend('Task');

	var findObject = function(array, attr, value) {
		for(var i = 0; i < array.length; i++) {
			if(array[i].hasOwnProperty(attr) && array[i][attr] === value) {
				return i;
			}
		}
		return -1;
	};

	$rootScope.$on('user:logout', function() {
		console.log('user:logout listener');
		tasks = [];
	});

	// Public API here
	return {
		getAll: function (callback) {
			if(tasks.length === 0) {
				var query = new Parse.Query(Task);
				query.equalTo('user', ParseUserService.getUser());
				query.find({
					success: function(results) {
						tasks = results;
						callback(tasks);
					},
					error: function(error) {
						console.log('Error: ' + error.code + ' ' + error.message);
					}
				});
			}
			else {
				callback(tasks);
			}
		},

		getById: function(id) {
			return tasks[findObject(tasks, 'id', id)];
		},

		add: function(name, callback) {
			if(typeof name === 'undefined' || name === '') { return; }
			var newtask = new Task();
			newtask.set('name', name);
			newtask.set('done', false);
			newtask.set('user', ParseUserService.getUser());
			newtask.setACL(new Parse.ACL(ParseUserService.getUser()));
			newtask.save(null, {
				success: function(newtask) {
					tasks.push(newtask);
					callback();
				},
				error: function(newtask, error) {
					console.log(error);
					callback(error);
				}
			});
		},

		removeById: function(id) {
			var index = findObject(tasks, 'id', id);
			if(typeof index === 'undefined' || index === -1) {
				return;
			}
			var deltask = tasks[index];
			tasks.splice(index, 1);
			deltask.destroy({
				success: function() {

				},
				error: function(error) {
					console.log(error);
				}
			});
		},

		edit: function(item) {
			var index = findObject(tasks, 'id', item.id);
			console.log(item.id);
			if(typeof index === 'undefined' || index === -1) {
				return;
			}
			var temp = tasks[index];
			console.log(temp.attributes.done);
			if(typeof item.attributes.name !== 'undefined') {
				temp.set('name', item.attributes.name);
			}
			if(typeof item.attributes.done !== 'undefined') {
				temp.set('done', item.attributes.done);
			}
			temp.save(null, {
				success: function(data) {
					tasks[index] = data;
				},
				error: function(error) {
					console.log(error);
				}
			});
		},
	};
});
