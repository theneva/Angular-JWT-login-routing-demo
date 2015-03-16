var app = angular.module('routingLoginDemo', [
]);

app.controller('MainController', function($scope, PersonService) {
	PersonService.findAll()
		.success(function(people) {
			$scope.people = people;
		});
});

app.service('PersonService', function($http) {
	this.findAll = function() {
		return $http.get('/api/people');
	}
});
