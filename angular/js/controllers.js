var app = angular.module('routingLoginDemo', [
]);

app.controller('MainController', function($scope, LoginService, PersonService) {
	LoginService.login()
		.then(function() {
			PersonService.findAll()
				.success(function(people) {
					$scope.people = people;
				});
		})
});

app.service('LoginService', function($http) {
	this.login = function() {
		return $http.post('/sessions')
			.then(function(response) {
				var token = response.data;
				$http.defaults.headers.common.Authorization = token;
			});
	};
});


app.service('PersonService', function($http) {
	this.findAll = function() {
		return $http.get('/api/people');
	}
});
