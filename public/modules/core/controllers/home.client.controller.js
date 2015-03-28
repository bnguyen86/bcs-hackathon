'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication','$location',
	function($scope, Authentication,$location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.createEvent = function(eventName){
			$location.url('/events/create?name='+eventName);
		}
	}


]);