'use strict';

// Declare app level module which depends on views, and components
console.log("I am in app.js");
angular.module('mycontacts', [
  'ngRoute',
  'mycontacts.contacts'
]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
