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

		toastr.options = {
		  "closeButton": false,
		  "debug": false,
		  "newestOnTop": false,
		  "progressBar": false,
		  "positionClass": "toast-top-full-width",
		  "preventDuplicates": false,
		  "onclick": null,
		  "showDuration": "0",
		  "hideDuration": "0",
		  "timeOut": "5000",
		  "extendedTimeOut": "1000",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		};

		toastr["success"](
			'<div class="text-center">'+
				'<h1><a href="/#!/events/'+event._id+'">YOU HAVE BEEN INVITED!</a></h1>'+
				'<h3>'+event.name+'</h3>'+
				'<h4>Date: '+event.date+'</h4>'+
				'<h4>Location: '+event.location+'</h4>'+
			'</div>'
			);

    		console.log(event);
		});

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);