app.factory('ergastAPIservice', function($http) {
	var ergastAPI = {};
	ergastAPI.getDrivers = function(year) {
		return $http({
			method: 'JSONP',
			url: 'http://ergast.com/api/f1/' + year + '/driverStandings.json?callback=JSON_CALLBACK'
		});
	}
	ergastAPI.getDriverDetails = function(id, year) {
		return $http({
			method: 'JSONP',
			url: 'http://ergast.com/api/f1/' + year + '/drivers/' + id + '/driverStandings.json?callback=JSON_CALLBACK' 
		});
	}
	ergastAPI.getDriverRaces = function(id, year) {
		return $http({
			method: 'JSONP',
			url: 'http://ergast.com/api/f1/' + year + '/drivers/' + id + '/results.json?callback=JSON_CALLBACK'
		});
	}
	ergastAPI.getTeams = function() {
		return $http({
			method: 'JSONP',
			url: 'http://ergast.com/api/f1/2014/constructorStandings.json?callback=JSON_CALLBACK'
		});
	}
	ergastAPI.getTeamDetails = function(id) {
		return $http({
			method: 'JSONP',
			url: 'http://ergast.com/api/f1/2014/constructors/' + id + '/constructorStandings.json?callback=JSON_CALLBACK'
		});
	}
	ergastAPI.getTeamDrivers = function(id) {
		return $http({
			method: 'JSONP',
			url: 'http://ergast.com/api/f1/2014/constructors/' + id + '/drivers.json?callback=JSON_CALLBACK'
		});
	}
	return ergastAPI;
});