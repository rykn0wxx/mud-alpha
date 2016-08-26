'use strict';

/**
 * @ngdoc directive
 * @name mudAlphaApp.directive:mudBoxes
 * @description
 * # mudBoxes
 */


angular.module('mudAlphaApp')
.directive('mudBoxes', ['$mdTheming', '$mdUtil', function($mdTheming, $mdUtil) {
	
	function mudBoxesCompile(elem, attr) {
		attr.usrTempl = null; 

		return function postLink(scope, element, attr, ctrl) {
			$mdUtil.initOptionalProperties(scope, attr);
			$mdTheming(element);
		};
	}

	return {
		templateUrl: 'partials/mudboxes.html',
		scope: {
			mudTheme: '@',
			mudColor: '@',
			mudIcon: '@',
			mudText: '@',
			mudNumber: '@',
			mudComment: '@'
		},
		restrict: 'E',
		compile: mudBoxesCompile,
		controller: 'MudBoxesCtrl',
		controllerAs: '$mudBoxCtrl'
	};
}])
.controller('MudBoxesCtrl', ['$scope', function($s) {
	var me = this;
	me.$s = $s;
	$s.mudMdColor = '';
	me.formatMdColor = function() {
		$s.mudMdColor = '::{backgroundColor: "' + $s.mudColor + '"}';
	};

}]);