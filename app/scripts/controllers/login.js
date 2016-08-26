'use strict';

/**
 * @ngdoc function
 * @name mudAlphaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the mudAlphaApp
 */
angular.module('mudAlphaApp')
.controller('LoginCtrl', ['$scope', '$route', '$location', 'AuthService', '$rootScope', 
	function ($s, $r, $l, AuthService, $rootScope) {
		var me = this;
		me.$s = $s;
		
		AuthService.ClearCredentials();
		
		me.dataLoading = false;
		me.$s.$on('$viewContentLoaded', function(evt) {
			$rootScope.globals.isLogedIn = false;
			angular.element('body').toggleClass('logging');
		});

		me.useroptions = [
			{usr: 'Admin', typ: 'admin'},
			{usr: 'Guest', typ: 'guest'}
		];

		me.logme = function () {
			me.dataLoading = true;
			AuthService.Login(me.name, me.usertype, function(response) {
				if(response.success) {
					AuthService.SetCredentials(me.name, me.usertype);
					$rootScope.globals.isLogedIn = true;
					angular.element('body').toggleClass('logging');
					$l.path('/main');
				} else {
					$s.error = response.message;
					me.dataLoading = false;
				}
			});
		};
	
}]);