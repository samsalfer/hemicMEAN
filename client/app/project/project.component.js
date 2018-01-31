'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './project.routes';

export class ProjectComponent {
  projectsList = [];
  newProject = {};
  projectSelected = {};
  newUser = '';

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
    //no rula el then
  }
  selectProject(projectId) {
    this.$http.get('api/projects/' + projectId)
      .then(res => {
        this.projectSelected = res.data;
      });
  }
  addUserProject() {
    this.$http.get('api/users/byName/' + this.newUser)
      .then(res => {
        this.projectSelected.users.push(res.data._id);
      })
      .then(() => {
        this.newUser = '';
        var data = 	{
          users: this.projectSelected.users,
        };
        this.$http.put('api/projects/' + this.projectSelected._id, data)
          .then(this.selectProject(this.projectSelected._id));
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
