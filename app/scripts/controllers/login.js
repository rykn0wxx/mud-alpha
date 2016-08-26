'use strict';

/**
 * @ngdoc function
 * @name mudAlphaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the mudAlphaApp
 */
angular.module('mudAlphaApp')
.controller('LoginCtrl', ['$scope', '$route', '$location', function ($s, $r, $l) {
	var me = this;
	me.$scope = $s;
	me.$scope.$on('$viewContentLoaded', function(evt) {
		$s.$parent.isLogedIn = false;
		angular.element('body').toggleClass('logging');
	});

	me.testLog = function() {
		$s.$parent.isLogedIn = true;
		angular.element('body').toggleClass('logging');
		$l.url('/main');
		console.log($l);
	};
}]);