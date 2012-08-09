'use strict';

app.factory('Project', function($railsResource) {
  return $railsResource('project');
});

function ProjectListCtrl($scope, Project) {
  $scope.projects = Project.all();
}

function ProjectShowCtrl($scope, Project, $routeParams) {
  $scope.project = Project.get($routeParams.projectId);
}

function ProjectNewCtrl($scope, Project) {
  $scope.project = Project.nil();
  $scope.submit = Project.create($scope.project);
  //                      ^^^^^^
}

function ProjectEditCtrl($scope, Project, $routeParams) {
  $scope.project = Project.get($routeParams.projectId);
  $scope.submit = Project.update($scope.project);
  //                      ^^^^^^
}

// $scope.projects.then(function(d) { console.log('then: %o', d)});
