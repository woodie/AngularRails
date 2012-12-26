var app = angular.module('application', ['railsHelper','railsModel']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    resourceWhen('contacts').
    resourceWhen('projects').
    otherwise({redirectTo: '/projects'});
}]);

