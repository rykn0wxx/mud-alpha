  'use strict';

/**
 * @ngdoc overview
 * @name mudAlphaApp
 * @description
 * # mudAlphaApp
 *
 * Main module of the application.
 */
angular
  .module('mudAlphaApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
		'ngMaterial',
		'datangular',
		'angular-jsonapi',
		'angular-jsonapi-rest',
		'angular-jsonapi-local',
		'angular-jsonapi-parse'
  ])
  .config(['$routeProvider', '$mdThemingProvider', '$sceDelegateProvider', '$mdAriaProvider',
	function ($routeProvider, $mdThemingProvider, $sceDelegateProvider, $mdAriaProvider) {

	var customPrimary = {
		'50' : '#90c4f2',	'100' : '#79b8f0',	'200' : '#63aced',	'300' : '#4ca0ea',	'400' : '#3594e8',	'500' : '#1E88E5',	'600' : '#187bd1',	'700' : '#166dba',	'800' : '#1360a4',	'900' : '#10538d',	'A100' : '#a7d1f5',	'A200' : '#beddf7','A400' : '#d5e9fa',	'A700' : '#0e4576'
	};

	var customAccent = {
		'50' : '#1b5d50',	'100' : '#217061',	'200' : '#278472',	'300' : '#2d9883',	'400' : '#33ab94',	'500' : '#38bfa5',	'600' : '#5ccfb8',	'700' : '#6fd5c1',	'800' : '#83dac9',	'900' : '#97e0d2',	'A100' : '#5ccfb8',	'A200' : '#48C9B0',	'A400' : '#38bfa5',	'A700' : '#aae6da'
	};

	var customWarn = {
		'50' : '#f5b4ad',	'100' : '#f29f97',	'200' : '#ef8a80',	'300' : '#ed7669',	'400' : '#ea6153',	'500' : '#E74C3C',	'600' : '#e43725',	'700' : '#d62c1a',	'800' : '#bf2718',	'900' : '#a82315',	'A100' : '#f8c9c4',	'A200' : '#fbdedb',	'A400' : '#fdf3f2',	'A700' : '#921e12'
	};
	var customBackground = {
		'50' : '#97a5b1',	'100' : '#8998a6',	'200' : '#7a8b9c',	'300' : '#6c7f90',	'400' : '#617282',	'500' : '#566573',	'600' : '#4b5864',	'700' : '#404b56',	'800' : '#353f47',	'900' : '#2a3239',	'A100' : '#a6b1bc',	'A200' : '#b4bec7',	'A400' : '#c3cbd2',	'A700' : '#1f252a'
	};

	$mdThemingProvider
	.definePalette('customPrimary',	customPrimary);

	$mdThemingProvider
	.definePalette('customAccent',	customAccent);

	$mdThemingProvider
	.definePalette('customWarn',	customWarn);

	$mdThemingProvider
	.definePalette('customBackground',	customBackground);


		$mdAriaProvider.disableWarnings();

		$sceDelegateProvider.resourceUrlWhitelist([
			'self',
			'**'
		]);
		
		$mdThemingProvider.theme('default')
			.primaryPalette('customPrimary')	
			.accentPalette('customAccent')
			.warnPalette('customWarn')
			.backgroundPalette('customBackground', {'default': '700'})
			.dark();	
			


    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about',
				resolve: {
					store: function(Datangular) {
						return Datangular;
					}
				}
      })
      .when('/entry/:id', {
        templateUrl: 'views/entry.html',
        controller: 'EntryCtrl',
        controllerAs: 'entry'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/login'
      });

  }])
	.run(function($templateRequest){
		var urls = [ 'images/fonts/fontawesome-webfont.svg'];
		angular.forEach(urls, function(url) {
			$templateRequest(url);
		});
	})
	.run(['$rootScope', '$location', '$cookieStore', '$http',
	function ($rootScope, $location, $cookieStore, $http) {
		
		// keep user logged in after page refresh
		$rootScope.globals = $cookieStore.get('globals') || {};
		$rootScope.globals.isLogedIn = false;
		if ($rootScope.globals.currentUser) {
			$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
		}
 
		$rootScope.$on('$locationChangeStart', function (event, next, current) {
			// redirect to login page if not logged in
			
			if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
				$location.path('/login');
			}
		});
		
		if (!$rootScope.globals.currentUser) {
			$location.path('/login');
		} else {
			$rootScope.globals.isLogedIn = true;
			angular.element('body').removeClass('logging');
		}
	}])
	.directive('a', function() {
		return {
			restrict: 'E',
			link: function(scope, elem, attrs) {
				if (attrs.href === '' || attrs.href === '#') {
					elem.on('click', function(e) {
						e.preventDefault();
					});
				}
			}
		};
	})
	.factory('AllSlaData', ['Datangular', function(Datangular) {
		return Datangular.readAllSlaData();
	}]);