'use strict';

/**
 * @ngdoc function
 * @name mudAlphaApp.controller:EntryCtrl
 * @description
 * # EntryCtrl
 * Controller of the mudAlphaApp
 */
angular.module('mudAlphaApp')
.controller('EntryCtrl', ['$scope', '$rootScope', '$routeParams', 'AllSlaData', 
function ($scope, $rootScope, $routeParams, AllSlaData) {
	var me = this;
	me.$s = $scope;
	me.projid = $routeParams.id;
	
	$rootScope.$on('$viewContentLoaded', function() {
		AllSlaData.then(function(d) {
			console.log(d);
		});
	});
	
	
	this.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];
}]);
