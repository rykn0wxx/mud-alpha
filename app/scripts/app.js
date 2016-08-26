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
		'ngMaterial'
  ])
  .config(['$routeProvider', '$mdThemingProvider', function ($routeProvider, $mdThemingProvider) {
		
		$mdThemingProvider.theme('default')
			.primaryPalette('light-blue')
			.accentPalette('grey', {'default': '800'})
			.warnPalette('orange')
			.backgroundPalette('blue', {'default': '700'})
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
        controllerAs: 'about'
      })
      .when('/entry', {
        templateUrl: 'views/entry.html',
        controller: 'EntryCtrl',
        controllerAs: 'entry'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/', {
        templateUrl: 'views/entry.html',
        controller: 'EntryCtrl',
        controllerAs: 'entry'
      })
      .otherwise({
        redirectTo: '/'
      });

  }])
	.run(function($templateRequest){
		var urls = [ 'images/fonts/fontawesome-webfont.svg'];
		angular.forEach(urls, function(url) {
			$templateRequest(url);
		});
	});