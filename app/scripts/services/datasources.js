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
		
		config.atypes = [function(arg) {
			return (!_.isNaN(_.toNumber(arg))) ? 'numeric' : null;
		}, 
		function (arg) {
			var tdate = Date.parse(arg);
			return ('Invalid Date' === tdate || null === tdate || isNaN(tdate) || arg.length < 5) ? null : 'Date';
		}, 
		function (arg) {
			return ((_.isString(arg)) && (arg.indexOf('<') !== -1) && (arg.indexOf('>') !== -1)) ? 'html' : 'string';
		}];

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
 
			function detectType(arg) {
				for (var t = config.atypes, a = t.length, n = 0; a > n; n++) {
					var o = t[n](arg);
					if (null !== o) {
						return o;
					}
				}
			}

			function createFields(obj) {
				var result = {};
				result.headers = _.keys(obj[0]);
				result.dimension = [];
				result.measures = [];
				_.forEach(obj[0], function(value, key) {
					var temp = detectType(value);
					if (temp === 'numeric' || temp === 'Date') {
						result.measures.push({key: key, type: detectType(value)});
					} else {
						result.dimension.push({key: key, type: detectType(value)});
					}
				});
				return result;
			}

			//generate dimension and measures
			function genReportFields(sourceObj) {
				var clonedObj = _.clone(sourceObj);
				var tempObj = createFields(clonedObj);
				var dataArray = {
					arrayDims : tempObj.dimension,
					arrayHeaders : tempObj.headers,
					arrayMeasures : tempObj.measures
				};
				return dataArray;
			}

			//read csv data
			function readSlaData(fileToRead) {
				if (!fileToRead) {
					fileToRead = 'sources/sladata.csv';
				}
				var defer = $q.defer();
				
				d3.csv(fileToRead, function(err, data) {
					_.forEach(data, function(val, ind) {
						val.rowIndex = ind;
						val.count = 1;
					});
					defer.resolve(data);
				});
				return defer.promise;
			}
			
			function readAllSlaData(fileToRead) {
				return $q(function(resolve, reject) {
					readSlaData().then(function(data) {
						var repFlds = genReportFields(data);
						var output = {
							rawdata: data,
							arrayDims: repFlds.arrayDims,
							arrayHeaders: repFlds.arrayHeaders,
							arrayMeasures: repFlds.arrayMeasures
						};
						resolve(output);
					});
				});
			}

			//random number generator
			function genRandomNumber(max, min) {
				var temp = _.random(1, 100);
				max = max || 1;
				min = min || 0;
				
				Math.seed = (temp * 9301 + 49297) % 233280;
				var rnd = Math.seed / 233280.0;

				return _.floor((min + rnd * (max - min)) * 100);
			}
			
			//get all projects on sources/projectlist.csv
			function getProjectList() {
				var me = this;
				var defer = $q.defer();
				d3.csv('sources/projectlist.csv', function(er, da) {
					da.forEach(function(d, i) {
						d.randoming = genRandomNumber() + '%';
						d.projColor = 'default-background-' + (_.round(genRandomNumber(1,7)/100) * 100) + '-' + _.random(500,99)/100;
						d.rowIndex = i;
						d.id = i;
					});
					defer.resolve(da);
				});
				return defer.promise;
			}

			Configurer.init(service, config);

			service.getProjectList = _.bind(getProjectList, service);
			service.readSlaData = _.bind(readSlaData, service);
			service.genReportFields = _.bind(genReportFields, service);
			service.readAllSlaData = _.bind(readAllSlaData, service);

			return service;
		}

		return createServiceForConfigurer(globalConfiguration);

	}];
	/* jshint ignore:end */
}]);