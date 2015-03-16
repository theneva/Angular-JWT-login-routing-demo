var app = angular.module('routingLoginDemo', [
]);

app.controller('MainController', function($scope, $http) {
	$http.get('/api/people')
		.success(function(people) {
			$scope.people = people;
		});
});
