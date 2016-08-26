'use strict';

/**
 * @ngdoc directive
 * @name mudAlphaApp.directive:smokeMaster
 * @description
 * # smokeMaster
 */
angular.module('mudAlphaApp')
.directive('smokeMaster', ['$timeout', function ($t) {
	var _ = window._;

	function elemInjector(t) {
		var a = t.text().split('');
		if (a.length) {
			t.empty();
			_.forEach(a, function(v, i) {
				var newElem = angular.element('<span class="blackblur char' + i++ + '">' + v + '</span>');
				newElem.css({
					'animation-delay': (parseFloat(i/10) + 0.2) + 's'
				});
				t.append(newElem);
			});
		}
		return t;
	} 

	function compileFunc(elem, att) {
		var cloneElem = elem.clone();
		cloneElem = elemInjector(cloneElem);
		return function postLink(scope, elem) {
			elem.replaceWith(cloneElem);
			scope.$on('$destroy', function(e) {
				console.log('>>>>>>>>DEBUG DESTROY', e);
			});
			$t(function() {
				cloneElem.addClass('zzz');
			}, 500	);
		};
	}

	return ({
		restrict: 'C',
		compile: compileFunc
	});
	
}]);
