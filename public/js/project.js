'use strict';

app.factory('Project', function($railsResource) {
  return $railsResource('project');
});

function ProjectListCtrl($scope, Project) {
  Project.all().then(function(klass) { $scope.projects = klass; });
  $scope.confirm_delete = function(item, message) {
    var index = $scope.projects.indexOf(item);
    $scope.projects.splice(index, 1);
    if (confirm(message) == true) {
      item.destroy(function(msg) {
        // on error, restore item that was removed
        $scope.projects.splice(index, 1, item);
        // need to catch when item already removed
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

