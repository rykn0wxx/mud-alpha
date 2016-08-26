'use strict';

/**
 * @ngdoc service
 * @name mudAlphaApp.Datangular
 * @description
 * # Datangular
 * Provider in the mudAlphaApp.
 */
angular.module('datangular', ['ngLodash'])
.provider('Datangular', ['lodash', function (_) {
	/* jshint ignore:start */
	var d3 = window.d3;
	
	var Configurer = {};
	Configurer.init = function(object, config) {
		object.configuration = config;

		config.baseUrl = _.isUndefined(config.baseUrl) ? '/' : config.baseUrl;
		object.setBaseUrl = function(newBaseUrl) {
			config.baseUrl = /\/$/.test(newBaseUrl) ?
			newBaseUrl.substring(0, newBaseUrl.length-1) : newBaseUrl;
			return this;
		};

		config.datafields = {};

		var Base = function() {};
		Base.prototype.dataset = {
			setProjects: function (raw) {
				config.datafields.projects = raw;
				return this;
			}
		};

		config.uCreateFactory = Base;

	};

	var globalConfiguration = {};

	Configurer.init(this, globalConfiguration);

	this.$get = ['$http', '$q', function($h, $q) {
		
		function createServiceForConfigurer(config) {
			var service = {};
			var theBase = new config.uCreateFactory();
			
			function genRandomNumber(max, min) {
				var temp = _.random(1, 100);
				max = max || 1;
				min = min || 0;
				
				Math.seed = (temp * 9301 + 49297) % 233280;
				var rnd = Math.seed / 233280.0;

				return _.floor((min + rnd * (max - min)) * 100);
			}
			
			function getProjectList() {
				var me = this;
				var defer = $q.defer();
				d3.csv('sources/projectlist.csv', function(er, da) {
					da.forEach(function(d, i) {
						d.randoming = genRandomNumber() + '%';
						d.projColor = 'default-primary-' + _.round(genRandomNumber(1,9)/100) * 100;
						d.rowIndex = i;
						d.id = i;
					});
					defer.resolve(da);
				});
				return defer.promise;
			}

			Configurer.init(service, config);

			service.getProjectList = _.bind(getProjectList, service);

			return service;
		}

		return createServiceForConfigurer(globalConfiguration);

	}];
	/* jshint ignore:end */
}]);