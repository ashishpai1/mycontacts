'use strict';

angular.module('mycontacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray',function($scope, $firebaseArray) {
	console.log("im in contacts.js...");
	var ref = new Firebase("https://contacts-345.firebaseio.com/contacts");

	$scope.contacts = $firebaseArray(ref);
	$scope.msg = true;
	$scope.addFormShow = false;
	console.log($scope.contacts);
	
	$scope.showEditForm = function(contact){
			console.log("Editing contact : " + contact);
	}

	$scope.removeContact = function(contact){
			console.log("Removing contact : " + contact);
	}

	$scope.showAddForm = function(){
		$scope.addFormShow = true;
	}

	$scope.hide = function(){
		$scope.addFormShow = false;
	}

}]);