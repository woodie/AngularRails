// We have greatly simplified the scaffold in these controllers
// by pushing functionality info rails_resource and rails_helper 

'use strict';

app.factory('Project', function(railsResource) {
  return railsResource('project');
});

function ProjectListCtrl($scope, Project) {
  Project.all('filter').then(function(list) { $scope.projects = list; });
  $scope.confirm_delete = function(item, message) {
    var index = $scope.projects.indexOf(item);
    if (confirm(message) == true) {
      $scope.projects.splice(index, 1);
      item.destroy(function() { $scope.projects.splice(index, 0, item); });
    }
  };
}

function ProjectShowCtrl($scope, Project, $routeParams, flashNotice) {
  $scope.project = Project.get($routeParams.projectId);
  $scope.notice = flashNotice.fetch();
}

function ProjectNewCtrl($scope, Project) {
  $scope.project = new Project();
  $scope.submit = function() {
    Project.create($scope.project, function(msg) { $scope.errors = msg; });
  };
}

function ProjectEditCtrl($scope, Project, $routeParams) {
  Project.get($routeParams.projectId).then(function(klass) {
    $scope.project = klass;
  });
  $scope.submit = function() {
    Project.update($scope.project, function(msg) { $scope.errors = msg; });
  };
}

