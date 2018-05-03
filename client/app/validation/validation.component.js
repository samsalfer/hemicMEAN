'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './validation.routes';
import _ from 'lodash';


export class ValidationComponent {
  formSelected = {};
  message='';
  widthAccepted = 0;
  widthRejected = 0;

  /*@ngInject*/
  constructor($http, Auth, $mdDialog, $scope) {
    this.$http = $http;
    this.forms = [];
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.isAdmin = Auth.isAdminSync;
    this.$mdDialog = $mdDialog;
    this.$scope = $scope;
  }
  $onInit() {
    let $http = this.$http;
    $http.get('api/forms')
      .then(res => {
        this.forms = res.data;
      });

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
  working(formValidation) {
    formValidation.statusForm = 'pending';
    this.updateForm(formValidation);
  }
  // Creado para el cambio de estadisticas de los usuarios en un formulario ( si aceptan o no el formulario )
  changeStateForm(state) {
    console.log(state);
    let aux = {user: this.getCurrentUser()._id, state: state};
    _.remove(this.formSelected.stadistics, n => {
      return n.user === this.getCurrentUser()._id;
    });

    this.formSelected.stadistics.push(aux);
    this.updateForm(this.formSelected);
    this.changeGraphics();
  }
  // funcion para calcular porcentajes de las estadisticas
  changeGraphics() {
    let total = this.formSelected.project.users.length;
    let positive = this.formSelected.stadistics;
    let negative = _.remove(positive, n => {
      return n.state === false;
    });
    this.widthAccepted = this.calculatePercentage(positive.length, total);
    this.widthRejected = this.calculatePercentage(negative.length, total);
  }
  calculatePercentage(number, total) {
    return (number * 100) / total;
  }
  updateForm(form) {
    this.$http.put('api/forms/' + form._id, form);
  }
  selectForm(form) {
    this.formSelected = form;
  }
  selectFormById(formId) {
    let $http = this.$http;
    $http.get('api/forms/' + formId)
      .then(res => {
        this.formSelected = res.data;
        this.changeGraphics();
      });
  }
  sendMessage(form) {
    let aux = {user: this.getCurrentUser().name, message: this.message};
    form.messages.push(aux);
    this.message = '';
    this.updateForm(form);
  }

  removeForm(formValidation){
    let getCurrentUser2 = this.getCurrentUser();


    this.$http.delete('api/forms/' + formValidation._id)
      .then(res => {
        var project = getCurrentUser2.projects.find(x => x._id === formValidation.project._id);
        var index = _.findIndex(project.forms, { '_id':formValidation._id});
        project.forms.splice(index, 1);
        this.formSelected = {};
      });
  }
}

export default angular.module('hemicApp.validation', [uiRouter])
  .config(routes)
  .component('validation', {
    template: require('./validation.html'),
    controller: ValidationComponent,
  })
  .name;
