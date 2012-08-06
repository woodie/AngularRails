'use strict';

function ContactShowCtrl($scope, $routeParams, $http) {
  var id = $routeParams.contactId;
  $http.get('/contacts/' + id + '.json').success(function(data) {
    $scope.contact = data;
  });
}

function ContactNewCtrl($scope, $routeParams, $http, $location) {
  $scope.notice = "";
  $scope.contact = {};
  $scope.submit = function() {
    $http.post('/contacts.json', $scope.contact)
    .success(function(data, status) {
      $scope.contact = data;
      $scope.notice = "Contact was successfully created.";
      $location.path('/contacts/' + $scope.contact.id);
    })
    .error(function(data, status) {
      // TODO: display an error
    });
  };
}

function ContactEditCtrl($scope, $routeParams, $http, $location) {
  var id = $routeParams.contactId;
  $scope.notice = "";
  $http.get('/contacts/' + id + '.json').success(function(data) {
    $scope.contact = data;
  });
  $scope.submit = function() {
    $http.put('/contacts/' + $scope.contact.id + '.json', $scope.contact)
    .success(function(data, status) {
      $scope.notice = "Contact was successfully undated.";
      $location.path('/contacts/' + $scope.contact.id);
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
    var cx = confirm(message);
    if (cx == true) {
      $http.delete('/contacts/' + contact.id + '.json', $scope.contact)
      .success(function(data, status) {
        var index = $scope.contacts.indexOf(contact);
        $scope.contacts.splice(index, 1);
      })
      .error(function(data, status) {
      });
    }
  };
}

