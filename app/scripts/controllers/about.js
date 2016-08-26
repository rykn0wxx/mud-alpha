'use strict';

/**
 * @ngdoc function
 * @name mudAlphaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mudAlphaApp
 */
angular.module('mudAlphaApp')
.controller('AboutCtrl', ['$scope', 'Datangular', 'lodash', function ($scope, Datangular, _) {
	var me = this;
	me.$s = $scope;
	 
	Datangular.getProjectList().then(function(data) {
		me.data = data;
	});

	Datangular.readSlaData().then(function(response) {
		me.csv1 = Datangular.genReportFields(response);
	});
	
	Datangular.readAllSlaData().then(function(data) {
		me.csv2 = data;
	});
		
}]);
