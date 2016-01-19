'use strict';

angular.module('mycontacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray',function($scope, $firebaseArray) {
	
	//init firebase
	var ref = new Firebase("https://contacts-345.firebaseio.com/contacts");

	$scope.contacts = $firebaseArray(ref);
	$scope.msg = null;
	$scope.addFormShow = false;
	
	


	console.log($scope.contacts);
	
	// show edit form and fill all fields in the form.
	$scope.showEditForm = function(contact){
		$scope.editFormShow = true;
		$scope.name = contact.name;
		$scope.email = contact.email;
		$scope.company = contact.company;
		$scope.work_phone = contact.phones[0].work;
		$scope.mobile_phone = contact.phones[0].mobile;
		$scope.home_phone = contact.phones[0].home;
		$scope.street_address = contact.address[0].street_address;
		$scope.city = contact.address[0].city;
		$scope.state = contact.address[0].state;
		$scope.zipcode = contact.address[0].zipcode;
        $scope.id = contact.$id;

	}
		
	$scope.updateEditedForm = function(){
		console.log('Updating Contact...');

		// Get ID
		var id = $scope.id;
		console.log(id);
		// Get Record
		var record = $scope.contacts.$getRecord(id);
		// Assign Values
		record.name 						= $scope.name;
		record.email 						= $scope.email;
		record.company 						= $scope.company;
		record.phones[0].work 				= $scope.work_phone;
		record.phones[0].home 				= $scope.home_phone;
		record.phones[0].mobile 			= $scope.mobile_phone;
		record.address[0].street_address 	= $scope.street_address;
		record.address[0].city 				= $scope.city;
		record.address[0].state 			= $scope.state;
		record.address[0].zipcode 			= $scope.zipcode;

		// Save Contact
		$scope.contacts.$save(record).then(function(ref){
			console.log(ref.key);
		});

		clearFields();

		// Hide Form
		$scope.editFormShow = false;

		$scope.msg = "Contact Updated";
	}

	$scope.removeContact = function(contact){
			console.log("Removing contact : " + contact);
	}

	$scope.showAddForm = function(){
		$scope.addFormShow = true;
	}

	$scope.hide = function(){
		$scope.addFormShow = false;
		$scope.contactShow = false;
		//$scope.editFormShow = false;
	}

	$scope.removeContact = function(contact){
		console.log('Removing Contact');

		$scope.contacts.$remove(contact);

		$scope.msg="Contact Removed";
	}

	$scope.showContact = function(contact){
		console.log("getting contact....");
		$scope.name = contact.name;
		$scope.email = contact.email;
		$scope.company = contact.company;
		$scope.work_phone = contact.phones[0].work;
		$scope.mobile_phone = contact.phones[0].mobile;
		$scope.home_phone = contact.phones[0].home;
		$scope.street_address = contact.address[0].street_address;
		$scope.city = contact.address[0].city;
		$scope.state = contact.address[0].state;
		$scope.zipcode = contact.address[0].zipcode;
        $scope.id = contact.$id;
		$scope.contactShow = true;

	}


	$scope.addFormSubmit = function(){
			if($scope.name){  var name = $scope.name; } else {  $scope.name = null;   }

			if($scope.email){  var email = $scope.email; } else {  $scope.email = null;   }

			if($scope.company){  var company = $scope.company; } else {  $scope.company = null;   }

			if($scope.work_phone){  var work_phone = $scope.work_phone; } else {  $scope.work_phone = null;   }

			if($scope.mobile_phone){  var mobile_phone = $scope.mobile_phone; } else {  $scope.mobile_phone = null;   }

			if($scope.home_phone){  var home_phone = $scope.home_phone; } else {  $scope.home_phone = null;   }

			if($scope.street_address){  var street_address = $scope.street_address; } else {  $scope.street_address = null;   }

			if($scope.city){  var city = $scope.city; } else {  $scope.city = null;   }

			if($scope.state){  var state = $scope.state; } else {  $scope.state = null;   }

			if($scope.zipcode){  var zipcode = $scope.zipcode; } else {  $scope.zipcode = null;   }


			$scope.contacts.$add({
				name: name,
				email: email,
				company: company,
				phones: [
				    {
						mobile: mobile_phone,
						home: home_phone,
						work: work_phone
					}
				],
				address: [
				    {
						street_address: street_address,
						city: city,
						state: state,
						zipcode:zipcode
					}
				]
			}).then(function(ref){
				// give the id of the contact. 
				var id = ref.key();

				console.log("edit contact with id : " + id);

				// clear form
				clearFields();

				// hide forms
				$scope.addFormShow = false;

				// send a message to the user 
				$scope.msg = "contact added";
			});

	}


	function clearFields(){
			$scope.name = '';
			$scope.email = '';
			$scope.company = '';
			$scope.work_phone = '';
			$scope.mobile_phone = '';
			$scope.home_phone = '';
			$scope.street_address = '';
			$scope.city = '';
			$scope.state = '';
			$scope.zipcode = '';
			$scope.id = null;

	}




}]);


		