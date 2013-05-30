'use strict';

angular.module('TasksApp')
.directive('row', function () {
	return {
		template: '<li><input ng-click="edit()" ng-model="item.attributes.done" ng-checked="item.attributes.done" type="checkbox"> <a href="#/task/{{item.id}}">{{item.attributes.name}}</a> <button ng-click="remove()">X</button><a href="#/task/{{item.id}}/edit">edit</a></li>',
		restrict: 'E',
		replace: true,
		scope: {
			item: '=',
			remove: '&',
			edit: '&',
		},
	};
});
