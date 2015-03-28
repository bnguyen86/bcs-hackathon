'use strict';

// Events controller

angular.module('events').controller('EventsController', ['$scope', '$filter', '$stateParams', '$location', 'Socket', 'Authentication', 'Events', 'Users',
	function($scope, $filter, $stateParams, $location, Socket, Authentication, Events, User) {

		$scope.authentication = Authentication;

		$scope.friends = User.query();

		$scope.friendList = [];

		// Create new Event
		$scope.create = function() {
			// Create new Event object
			var event = new Events ({
				name: this.name,
				location: this.location,
				friends: this.friendList,
				date: new Date(this.date_date + ' ' + this.date_time)
			});

			// Redirect after save
			event.$save(function(response) {
				$location.path('events/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		Socket.on('article.created', function(article) {
    		console.log(article);
		});

		// Remove existing Event
		$scope.remove = function(event) {
			if ( event ) { 
				event.$remove();

				for (var i in $scope.events) {
					if ($scope.events [i] === event) {
						$scope.events.splice(i, 1);
					}
				}
			} else {
				$scope.event.$remove(function() {
					$location.path('events');
				});
			}
		};

		// Update existing Event
		$scope.update = function() {
			var event = $scope.event;

			event.$update(function() {
				$location.path('events/' + event._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Events
		$scope.find = function() {
			$scope.events = Events.query();
		};

		// Find existing Event
		$scope.findOne = function() {
			$scope.event = Events.get({ 
				eventId: $stateParams.eventId
			});
		};


		$scope.updateFriendList = function () {
		    var friendListObj = $filter('filter')($scope.friends, {checked: true});
		    $scope.friendList = [];
		    for(var i = 0 ; i < friendListObj.length ; i++){
		    	$scope.friendList.push(friendListObj[i]._id);
		    }

		}

	}
]);