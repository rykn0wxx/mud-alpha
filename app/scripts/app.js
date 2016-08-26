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
		'datangular'
  ])
  .config(['$routeProvider', '$mdThemingProvider', '$sceDelegateProvider', '$mdAriaProvider',
	function ($routeProvider, $mdThemingProvider, $sceDelegateProvider, $mdAriaProvider) {

		$mdAriaProvider.disableWarnings();

		$sceDelegateProvider.resourceUrlWhitelist([
			'self',
			'**'
		]);
		$mdThemingProvider.theme('default')
			.primaryPalette('blue')	
			.accentPalette('indigo')
			.warnPalette('deep-orange')
			.backgroundPalette('blue')
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
	.directive('scroll', ['$window', '$timeout', function($window, $t) {
		return function (scope, elem, attr) {
			var $ = window.$;
			scope.scrolltop = $(window).scrollTop;
			$(window).on('scroll', function(ev) {
				console.log('asda');
			});
			
			angular.element($window).bind('scroll', function() {
				console.log('asd');
				scope.$apply();
			});
			
			angular.element($window).on('scroll', function(e) {
				console.log('asdasd');
			});
		};
	}]);
	/*
	.directive('scrollPosition', ['$window', function($window) {
		return {
			scope: {
				scroll: '=scrollPosition'
			},
			link: function postLink(scope, elem) {
				var w = angular.element($window);
				var handler = function() {
					scope.scroll = w.scrollTop();
				};
				w.on('scroll', scope.$apply.bind(scope, handler));
				handler();
			}
		};
	}]);
	*/
	/*
	.directive('contentWrapper', ['$window', function($window) {
		return {
			restrict: 'C',
			link: function postLink(scope, elem) {
				var w = angular.element($window);
				scope.getWindowDimensions = function () {
					return {
						'h': w.height(),
						'w': w.width()
					};
				};
				scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
					scope.windowHeight = newValue.h;
					scope.windowWidth = newValue.w;

					scope.style = function () {
						return {
							'min-height': (newValue.h - 100) + 'px'
							//'width': (newValue.w - 100) + 'px'
						};
					};

        }, true);
				
				elem.bind('resize', function(){
					console.log('ress');
				});
				w.bind('resize', function () {
					elem.css('min-height', scope.windowHeight);
					scope.$apply();
        });
			}
		};
	}]);
	*/