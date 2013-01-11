// Services to help us crerate AngularJS scaffold

'use strict';

var railsHelper = angular.module('railsHelper', []);

railsHelper.directive('globalError', function (flashError) {
  return {
    restrict: 'E',
    link: function($scope, elem, attrs) { $scope.flashError = flashError; },
    template: '<div id="error_explanation" ng-show="flashError.error">' +
              '<h2>{{flashError.error}}</h2></div>'
  }
})

railsHelper.factory('flashNotice', function() {
  return {
    message: null,
    set: function(msg) {
      this.message = msg;
    },
    fetch: function() {
      var out = this.message;
      this.message = null;
      return out;
    }
  };
});

railsHelper.factory('flashError', function($rootScope) {
  var flash = {
    show: function(data, status) {
      var tidy = 'Some other error: ' + status;
      if (status == 500) { tidy = data.split(/<\/?pre>/,2).pop(); }
      flash.error = tidy;
    }
  };
  $rootScope.$on('$routeChangeSuccess', function() { flash.error = null; })
  return flash;
});

// REMIND: we need to create services for these

function rails_helper(scope, inflector) {
  scope.form_path = path_for('form', inflector);
}

function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function singularize(string) {
  return string.slice(0, -1); // obviously a hack
}

function path_for(type, inflector) {
  return 'partials/' + inflector.plural + '-' + type + '.html';
}

// REMIND: Instead of 'resourceWhen' we could use 'whenever'

railsHelper.config(function($routeProvider) {
  $routeProvider.resourceWhen = function(model) {
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
    return $routeProvider;
  };
});

