var app = angular.module('loginDemo', [
	'ngRoute',
]);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'MainController',
			templateUrl: 'templates/main.html'
		})
		.otherwise({
			controller: 'NotFoundController',
			templateUrl: 'templates/not_found.html'
		});
});

app.controller('NotFoundController', function($scope) {
	$scope.message = 'Not found!';
});

app.controller('MainController', function($scope, LoginService, UserService) {
	LoginService.login('theneva', 'ananas')
		.then(function() {
			UserService.findAll()
				.success(function(users) {
					$scope.users = users;
				});
		});
});

app.service('UserService', function($http) {
	this.findAll = function() {
		return $http.get('/api/users');
	};
});

app.service('LoginService', function($http) {
	this.login = function(username, password) {
		return $http.post('/api/sessions', {username: username, password: password})
			.success(function(token) {
				$http.defaults.headers.common.Authorization = token;
			});
	};
});
