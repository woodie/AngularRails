'use strict';

function ContactShowCtrl($scope, $routeParams, $http, flashNotice) {
  var id = $routeParams.contactId;
  $http.get('/contacts/' + id + '.json').success(function(data) {
    $scope.contact = data;
  });
  $scope.notice = flashNotice.fetch();
}

function ContactNewCtrl($scope, $routeParams, $http, $location, flashNotice) {
  $scope.contact = {};
  $scope.submit = function() {
    $http.post('/contacts.json', $scope.contact)
    .success(function(data, status) {
      $scope.contact = data;
      flashNotice.set('Contact was successfully created.');
      $location.path('/contacts/' + $scope.contact.id);
    })
    .error(function(data, status) {
      // TODO: display an error`
    });
  };
}

function ContactEditCtrl($scope, $routeParams, $http, $location, flashNotice) {
  var id = $routeParams.contactId;
  $http.get('/contacts/' + id + '.json').success(function(data) {
    $scope.contact = data;
  });
  $scope.submit = function() {
    $http.put('/contacts/' + $scope.contact.id + '.json', $scope.contact)
    .success(function(data, status) {
      flashNotice.set('Contact was successfully undated.');
      $location.path('/contacts/' + $scope.contact.id);
    })
    .error(function(data, status) {
      // TODO: display an error
    });
  };
}

function ContactListCtrl($scope, $http) {
  $http.get('/contacts.json').success(function(data) {
    $scope.contacts = data;
  });
  $scope.confirm_delete = function(contact, message) {
    if (confirm(message) == true) {
      $http.delete('/contacts/' + contact.id + '.json', $scope.contact)
      .success(function(data, status) {
        var index = $scope.contacts.indexOf(contact);
        $scope.contacts.splice(index, 1);
      })
      .error(function(data, status) {
        // TODO: display an error
      });
    }
  };
}

