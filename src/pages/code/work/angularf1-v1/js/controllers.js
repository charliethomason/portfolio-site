app.controller('driversController', function($scope, $rootScope, ergastAPIservice) {
	$scope.nameFilter = null;
	$scope.driversList = [];
	if(!$rootScope.year) {
		$rootScope.year = '2014';
	}
	$rootScope.year = $scope.year;
	$scope.searchFilter = function(driver) {
		var keyword = new RegExp($scope.nameFilter, 'i');
		return !$scope.nameFilter || keyword.test(driver.Driver.givenName) || keyword.test(driver.Driver.familyName);
	};
	$scope.change = function() {
		$rootScope.year = this.year;
		ergastAPIservice.getDrivers($rootScope.year).success(function(response) {
			$scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
		});
	}
	ergastAPIservice.getDrivers($rootScope.year).success(function(response) {
		document.getElementById('loading-gif').style.display = 'none';
		$scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
	});
});
app.controller('driverController', function($scope, $routeParams, $rootScope, ergastAPIservice) {
	$scope.id = $routeParams.id;
	$scope.races = [];
	$scope.driver = null;
	if(!$rootScope.year) {
		$rootScope.year = '2014';
	}
	ergastAPIservice.getDriverDetails($scope.id, $rootScope.year).success(function(response) {
		$scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
	});
	ergastAPIservice.getDriverRaces($scope.id, $rootScope.year).success(function(response) {
		document.getElementById('loading-gif').style.display = 'none';
		$scope.races = response.MRData.RaceTable.Races;
	});
});
app.controller('teamsController', function($scope, ergastAPIservice) {
	$scope.teamsList = [];
	ergastAPIservice.getTeams().success(function(response) {
		document.getElementById('loading-gif').style.display = 'none';
		$scope.teamsList = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
	});
});
app.controller('teamController', function($scope, $routeParams, ergastAPIservice) {
	$scope.id = $routeParams.id;
	$scope.driversList = [];
	$scope.team = null;
	ergastAPIservice.getTeamDetails($scope.id).success(function(response) {
		document.getElementById('loading-gif').style.display = 'none';
		$scope.team = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0];
	});
	ergastAPIservice.getTeamDrivers($scope.id).success(function(response) {
		$scope.driversList = response.MRData.DriverTable.Drivers;
	});
});