'use strict';

app.factory('Project', function($railsResource) {
  return $railsResource('project');
});

function ProjectListCtrl($scope, Project) {
  $scope.projects = Project.all();
  $scope.confirm_delete = function(contact, message) {
    if (confirm(message) == true) {
      // do something
    }
  };
}

function ProjectShowCtrl($scope, Project, flashNotice, $routeParams) {
  $scope.project = Project.get($routeParams.projectId);
  $scope.notice = flashNotice.fetch();
}

function ProjectNewCtrl($scope, flashErrors, Project) {
  $scope.project = Project.nil();
  $scope.errors = null;
  $scope.submit = function() {
    Project.create($scope.project);
    $scope.errors = flashErrors.fetch();
  };
}

function ProjectEditCtrl($scope, flashErrors, Project, $routeParams) {
  $scope.project = Project.get($routeParams.projectId);
  $scope.errors = null;
  $scope.submit = function() {
    $scope.project.id = $routeParams.projectId; // need to stop using promise
    Project.update($scope.project);
    $scope.errors = flashErrors.fetch();
  };
}
