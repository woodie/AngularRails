'use strict';

app.factory('Project', function($railsResource) {
  return $railsResource('project');
});

function ProjectListCtrl($scope, Project) {
  Project.all().then(function(klass) {
    $scope.projects = klass;
  });
  $scope.confirm_delete = function(contact, message) {
    if (confirm(message) == true) {
      console.log("list %o", $scope.projects);
      $scope.projects.destroy(contact, function(msg) {
        $scope.list_errors = msg;
      });
    }
  };
}

function ProjectShowCtrl($scope, Project, flashNotice, $routeParams) {
  $scope.project = Project.get($routeParams.projectId);
  $scope.notice = flashNotice.fetch();
}

function ProjectNewCtrl($scope, Project) {
  $scope.errors = null;
  $scope.project = Project.nil();
  $scope.submit = function() {
    Project.create($scope.project, function(msg) { $scope.errors = msg; });
  };
}

function ProjectEditCtrl($scope, Project, $routeParams) {
  $scope.errors = null;
  Project.get($routeParams.projectId).then(function(klass) {
    $scope.project = klass;
  });
  $scope.submit = function() {
    Project.update($scope.project, function(msg) { $scope.errors = msg; });
  };
}

