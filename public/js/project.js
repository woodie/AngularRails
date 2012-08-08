'use strict';

function Project() {
  // inherits from rails model
  // this.get = function() {};
  // this.create = function() {};
  // this.update = function() {};
  // this.destroy = function() {};
  this.inflector = {
    classical:'Project', plural:'projects', singular:'project'
  };
}

function ProjectListCtrl($scope) {
  $scope.projects = new Project.all($scope);
  $scope.destroy = function(project) {
    $scope.projects.destroy(project);
  };
}

function ProjectItemCtrl($scope, $routeParams) {
  $scope.project = new Project($scope, $routeParams.projectId);
  $scope.create = function() { $scope.project.create(); };
  $scope.update = function() { $scope.project.update(); };
}

