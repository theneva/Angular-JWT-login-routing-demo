var app = angular.module('routingLoginDemo', [
	'ngRoute',
]);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {controller: 'MainController', templateUrl: 'templates/main.html'})
		.when('/login', {controller: 'LoginController', templateUrl: 'templates/login.html'})
		.otherwise({controller: 'NotFoundController', templateUrl: 'templates/not_found.html'});
});

app.controller('MainController', function($scope, $location, LoginService, PersonService) {
	PersonService.findAll()
		.success(function(people) {
			$scope.people = people;
		})
		.error(function(message) {
			console.log(message);
			$location.path('/login');
		});
});

app.controller('LoginController', function($scope, $location, LoginService) {
	$scope.login = function(username, password) {

		console.log('logging in with username: ' + username + ' and password: ' + password);

		LoginService.login(username, password)
			.then(function() {
				$location.path('/');
			});
	};
});

app.controller('NotFoundController', function($scope) {
	$scope.message = 'Not found!';
});

app.service('LoginService', function($http) {
	this.login = function(username, password) {
		return $http.post('/sessions', {username: username, password: password})
			.success(function(token) {
				$http.defaults.headers.common.Authorization = token;
			})
			.error(function(message) {
				console.log(message);
			});
	};
});

app.service('PersonService', function($http) {
	this.findAll = function() {
		return $http.get('/api/people');
	};
});
