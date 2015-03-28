'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Socket', 'Menus',
	function($scope, Authentication, Socket, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		Socket.on('event.created', function(event) {
    		console.log(event);
		});

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);