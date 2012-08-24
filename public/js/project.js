'use strict';

app.factory('Project', function($railsResource) {
  return $railsResource('project');
});

function ProjectListCtrl($scope, Project) {
  Project.all().then(function(klass) { $scope.projects = klass; });
  $scope.confirm_delete = function(item, message) {
    var index = $scope.projects.indexOf(item);
    if (confirm(message) == true) {
      $scope.projects.splice(index, 1);
      item.destroy(function(msg) {
        $scope.projects.splice(index, 0, item);
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
  $scope.project = Project.nil();
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

