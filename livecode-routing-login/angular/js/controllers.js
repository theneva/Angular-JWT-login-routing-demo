var app = angular.module('loginDemo', [
	'ngRoute',
]);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'MainController',
			templateUrl: 'templates/main.html'
		})
		.when('/login', {
			controller: 'LoginController',
			templateUrl: 'templates/login.html'
		})
		.otherwise({
			controller: 'NotFoundController',
			templateUrl: 'templates/not_found.html'
		});
});

app.controller('LoginController', function($scope, $location, LoginService) {
	$scope.login = function(username, password) {
		LoginService.login(username, password)
			.then(function() {
				$location.path('/');
			});
	};
});

app.service('LoginService', function($http) {
	this.login = function(username, password) {
		return $http.post('/api/sessions', {username: username, password: password})
			.success(function(token) {
				$http.defaults.headers.common.Authorization = token;
			})
			.error(function(message) {
				// Alert the user
				console.log(message);
			});
	};
});


app.controller('NotFoundController', function($scope) {
	$scope.message = 'Not found!';
});

app.controller('MainController', function($scope, UserService) {
	UserService.findAll()
		.success(function(users) {
			$scope.users = users;
		});
});

app.service('UserService', function($http) {
	this.findAll = function() {
		return $http.get('/api/users');
	};
});
