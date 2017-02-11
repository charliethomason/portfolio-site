var app = angular.module('F1StatsApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/drivers', {
		templateUrl: 'partials/drivers.html',
		controller: 'driversController'
	})

	.when('/drivers/:id', {
		templateUrl: 'partials/driver.html',
		controller: 'driverController'
	})

	.when('/teams/:id', {
		templateUrl: 'partials/team.html',
		controller: 'teamController'
	})

	.when('/teams', {
		templateUrl: 'partials/teams.html',
		controller: 'teamsController'
	})

	.otherwise({
		redirectTo: '/drivers'
	});

}]);