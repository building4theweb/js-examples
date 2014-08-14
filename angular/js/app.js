/* global angular */

var todoApp = angular.module('todoApp', []);

todoApp.controller('TaskListCtrl', function($scope) {
  $scope.tasks = [];

  $scope.onFormSubmit = function() {
    if ($scope.inputField) {
      $scope.tasks.push({title: $scope.inputField, completed: false});
      $scope.inputField = '';
    }
  };

  $scope.toggleCompleted = function(task) {
    if (task.completed) {
      task.completed = false;
    } else {
      task.completed = true;
    }
  };

  $scope.removeItem = function(index) {
    $scope.tasks.splice(index, 1);
  };
});
