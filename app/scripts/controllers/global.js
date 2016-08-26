'use strict';
 
/**
 * @ngdoc function
 * @name mudAlphaApp.controller:GlobalctrlCtrl
 * @description
 * # GlobalctrlCtrl
 * Controller of the mudAlphaApp
 */
angular.module('mudAlphaApp')
.controller('GlobalCtrl', ['$scope', '$mdColors', '$rootScope', '$location', '$window',
function ($scope, $mdColors, $rootScope, $location, $w) {
	var me = this;
	
	$scope.isLogedIn = $rootScope.globals.isLogedIn;
	$scope.scroll = 0;
	$scope.getColor = function (color) {
		return $mdColors.getThemeColor(color);
  };
	
	$rootScope.$on('$locationChangeStart', function() {
		$scope.currentNavItem = $location.path().substr(1);
	});
	
	
}]);
