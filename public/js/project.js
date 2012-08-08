'use strict';

app.factory('projects', function($railsResource) {
  return $railsResource('project');
});

function ProjectListCtrl($scope, projects) {
  $scope.projects = projects.all();
}

function ProjectNewCtrl($scope, projects) {
  $scope.project = projects.new();
}

function ProjectShowCtrl($scope, projects, $routeParams) {
  $scope.project = projects.get($routeParams.projectId);
}

function ProjectEditCtrl($scope, projects, $routeParams) {
  $scope.project = projects.get($routeParams.projectId);
}

