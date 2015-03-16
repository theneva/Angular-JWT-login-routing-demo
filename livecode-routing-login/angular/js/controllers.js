var app = angular.module('loginDemo', [
]);

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
