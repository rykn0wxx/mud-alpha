'use strict';

/**
 * @ngdoc function
 * @name mudAlphaApp.controller:EntryCtrl
 * @description
 * # EntryCtrl
 * Controller of the mudAlphaApp
 */
angular.module('mudAlphaApp')
.controller('EntryCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
	var me = this;
	me.$s = $scope;
	
	me.projid = $routeParams.id;
	
	this.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];
}]);
