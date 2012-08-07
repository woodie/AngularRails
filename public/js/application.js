var app = angular.module('application', []);

app.factory('flashNotice', function($rootScope) {
  return {
    message: null,
    set: function(msg) {
      this.message = msg;
    },
    fetch: function() {
      out = this.message;
      this.message = null;
      return out;
    }
  };
});

function full_messages(data) {
  var messages = [];
  for (var key in data) {
    for (var i in data[key]) {
      messages.push(capitalise(key) + " " + data[key][i]);
    }
  }
  return { full_messages: messages, count: messages.length };
}

function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function singularize(string) {
  return string.slice(0, -1); // obviously a hack
}

app.provider('resourceRoute', function($routeProvider) {
    
  this.when = function(model) {
    $routeProvider
    .when('/' + model, {
      templateUrl: 'partials/' + model + '-list.html',
      controller: capitalise(singularize(model)) + 'ListCtrl'
    })
    .when('/' + model + '/new', {
      templateUrl: 'partials/' + model + '-new.html',
      controller: capitalise(singularize(model)) + 'NewCtrl'
    })
    .when('/' + model + '/:' + singularize(model) + 'Id/edit', {
      templateUrl: 'partials/' + model + '-edit.html',
      controller: capitalise(singularize(model)) + 'EditCtrl'
    })
    .when('/' + model + '/:' + singularize(model) + 'Id', {
      templateUrl: 'partials/' + model + '-show.html',
      controller: capitalise(singularize(model)) + 'ShowCtrl'
    });
    return this;
  };

  this.otherwise = function(params) {
    $routeProvider.otherwise(params);
    return this;
  }

  this.$get = function() {};
});

app.config(['resourceRouteProvider', function(resourceRoute) {
  resourceRoute.when('contacts')
  .otherwise({redirectTo: '/contacts'});
}]);
