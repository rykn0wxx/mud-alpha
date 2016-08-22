'use strict';

/**
 * @ngdoc function
 * @name mudAlphaApp.controller:GlobalctrlCtrl
 * @description
 * # GlobalctrlCtrl
 * Controller of the mudAlphaApp
 */
angular.module('mudAlphaApp')
.controller('GlobalCtrl', ['$scope', '$mdColors', '$mdColorUtil', 
function ($scope, $mdColors, $mdColorUtil) {
	$scope.getColor = function (color) {
		return $mdColors.getThemeColor(color);
  };
}]);
