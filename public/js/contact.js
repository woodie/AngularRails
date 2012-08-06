'use strict';

function ContactShowCtrl($scope, $routeParams, $http) {
  $http.get('/contacts/' + $routeParams.contactId + '.json').success(function(data) {
    $scope.contact = data;
  });
}

function ContactNewCtrl($scope, $routeParams, $http, $location) {
  $scope.notice = "";
  $scope.contact = {};
  $scope.submit = function() {
    $http({
      url: '/contacts.json',
      method: 'POST',
      data: $scope.contact,
      headers: {'Content-Type': 'application/json'}
    })
    .success(function(data, status) {
      $scope.notice = "Contact was successfully created.";
      $location.path('#/contacts/' + $scope.contact.id);
    })
    .error(function(data, status) {
      // TODO: display an error
    });
  };
}

function ContactEditCtrl($scope, $routeParams, $http, $location) {
  $scope.notice = "";
  $http.get('/contacts/' + $routeParams.contactId + '.json').success(function(data) {
    $scope.contact = data;
  });
  $scope.submit = function() {
    $http({
      url: '/contacts/' + $scope.contact.id + '.json',
      method: 'PUT',
      data: $scope.contact,
      headers: {'Content-Type': 'application/json'}
    })
    .success(function(data, status) {
      $scope.notice = "Contact was successfully undated.";
      $location.path('#/contacts/' + $scope.contact.id);
    })
    .error(function(data, status) {
      // TODO: display an error
    });
  };
}

function ContactListCtrl($scope, $http) {
  $scope.notice = "";
  $http.get('/contacts.json').success(function(data) {
    $scope.contacts = data;
  });
  $scope.confirm_delete = function(contact, message) {
    $http({
      url: '/contacts/' + contact.id + '.json',
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    .success(function(data, status) {
    })
    .error(function(data, status) {
    });
    // angular.Array.remove($scope.contacts, contact);
  };
}

