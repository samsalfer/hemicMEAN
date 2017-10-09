'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './validation.routes';

export class ValidationComponent {
  formSelected = {};
  /*@ngInject*/
  constructor($http, $mdDialog, $scope) {
    this.$http = $http;
    this.forms = [];
    this.$mdDialog = $mdDialog;
    this.$scope = $scope;
  }
  $onInit() {
    let $http = this.$http;
    let $mdDialog = this.$mdDialog;
    let $scope = this.$scope;

    $http.get('api/forms')
      .then(res => {
        this.forms = res.data;
      });

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
  //Se puede cambiar solo un atributo??? cómo es la sentencia?
  //Change the status of forms
  deny(formValidation) {
    formValidation.statusForm = 'denied';
    this.updateForm(formValidation);
  }
  accept(formValidation) {
    formValidation.statusForm = 'accepted';
    this.updateForm(formValidation);
  }
  updateForm(form) {
    this.$http.put('api/forms/' + form._id, form);
  }
  selectForm(form) {
    this.formSelected = form;
    console.log(this.formSelected);
  }
}

export default angular.module('hemicApp.validation', [uiRouter])
  .config(routes)
  .component('validation', {
    template: require('./validation.html'),
    controller: ValidationComponent,
  })
  .name;
