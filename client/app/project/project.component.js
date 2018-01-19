'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './project.routes';

export class ProjectComponent {
  projectsList = [];
  newProject = {};
  /*@ngInject*/
  constructor($http, Auth, $mdDialog, $scope) {
    this.$http = $http;
    this.$mdDialog = $mdDialog;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.$scope = $scope;
  }
  $onInit() {
    let $mdDialog = this.$mdDialog;
    let $scope = this.$scope;

    $scope.showModelForm = function(modelElement) {
      $mdDialog.show({
        contentElement: modelElement,
        parent: angular.element(document.body)
      });
    }
    $scope.hideModelForm = function() {
      $mdDialog.hide();
    };
  }
  saveProject(Auth) {
    this.$http.post('api/projects', this.newProject)
      .then(() => {
        this.getCurrentUser = Auth.getCurrentUserSync;
      });
  }
}

export default angular.module('hemicApp.project', [uiRouter])
  .config(routes)
  .component('project', {
    template: require('./project.html'),
    controller: ProjectComponent,
    // controllerAs: 'projectCtrl'
  })
  .name;
