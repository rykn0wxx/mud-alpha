'use strict';

/**
 * @ngdoc function
 * @name mudAlphaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mudAlphaApp
 */
angular.module('mudAlphaApp')
.controller('MainCtrl', ['AuthService', function (AuthService) {
	this.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];

}]);
