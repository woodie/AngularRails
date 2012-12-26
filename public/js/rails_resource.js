'use strict';

var railsModel = angular.module('railsModel', []);

railsModel.factory('railsResource', 
    function($http, $location, flashNotice, flashError) {

  var full_messages = function(data, status) {
    console.log('status', status);
    var ui_class = {};
    var messages = [];
    if (status == 422) {
      for (var key in data) {
        ui_class[key] = 'field_with_errors';
        for (var i in data[key]) {
          messages.push(capitalise(key) + " " + data[key][i]);
        }
      }
      return { full_messages: messages, ui_class: ui_class };
    } else {
      flashError.show(data, status);
    }
  }

  return function(singular, plural) {
    if (typeof plural == 'undefined' ) { plural = singular + 's'; }
    
    var Klass = function Klass(data) {
      angular.extend(this, data);
    };

    Klass.all = function(query) {
      return $http.get('/' + plural + '.json')
      .then(function(response) {
        return response.data.map(function(obj) {
          return new Klass(obj);
        });
      }, function(response) {
        flashError.show(response.data, response.status);
      });
    };

    Klass.get = function(id) {
      return $http.get('/' + plural + '/' + id + '.json')
      .then(function(response) {
        return new Klass(response.data);
      }, function(response) {
        flashError.show(response.data, response.status);
      });
    };

    Klass.create = function(obj, erf) {
      $http.post('/' + plural + '.json', obj)
      .success(function(data, status) {
        flashNotice.set(capitalise(singular) + ' was successfully created.');
        $location.path('/' + plural + '/' + data.id);
      })
      .error(function(data, status) {
        erf(full_messages(data, status));
      });
    };

    Klass.update = function(obj, erf) {
      $http.put('/' + plural + '/' + obj.id + '.json', obj)
      .success(function(data, status) {
        flashNotice.set(capitalise(singular) + ' was successfully undated.');
        $location.path('/' + plural + '/' + obj.id);
      })
      .error(function(data, status) {
        erf(full_messages(data, status));
      });
    };

    // can we delete this?
    Klass.destroy = function() {
    };

    Klass.prototype.update = function() {
      Klass.update(this);
    };

    Klass.prototype.path = function(type) {
      return 'partials/' + plural + '-' + type + '.html';
    };

    Klass.prototype.destroy = function(restore_item) {
      $http.delete('/' + plural + '/' + this.id + '.json')
      .then(function(response) {
          // possible undo-delete prompt here
        }, function(response) {
        if (response.status === 404) {
          restore_item(); 
        } else {
          flashError.show(response.data, response.status);
        }
      });
    };

    return Klass;
  };
});

