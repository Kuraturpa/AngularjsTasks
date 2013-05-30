'use strict';

angular.module('TasksApp')
	.factory('ParseUserService', function (ConfigService) {

		Parse.initialize(ConfigService.parseAppKey(), ConfigService.parseJSApiKey());

		var user;
		var currentUser = Parse.User.current();
		if (currentUser) {
			user = currentUser;
		} else {
		    user = new Parse.User();
		}


		// Public API here
		return {
			getUser: function() {
				return Parse.User.current();
			},
			signUp: function(username, email, password, callback) {
				user = new Parse.User();
				user.set('username', username);
				user.set('email', email);
				user.set('password', password);
				user.signUp(null, {
					success: function(user) {
						user = user;
						callback(user);
					},
					error: function(user, error) {
						callback(user, error);
					}
				});
			},
			loggedIn: function() {
				if(Parse.User.current() === null) {
					return false;
				}
				else {
					return true;
				}
			},
			login: function(username, password, callback) {
				Parse.User.logIn(username, password, {
					success: function(user) {
						user = user;
						callback(user);
					},
					error: function(user, error) {
						callback(user, error);
					}
				});
			},
			logout: function() {
				Parse.User.logOut();
				user = null;
			},
		};
	});
