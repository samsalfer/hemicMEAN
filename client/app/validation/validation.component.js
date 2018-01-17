'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './validation.routes';

export class ValidationComponent {
  formSelected = {};
  message='';
  /*@ngInject*/
  constructor($http, Auth) {
    this.$http = $http;
    this.forms = [];
    this.getCurrentUser = Auth.getCurrentUserSync;
  }
  $onInit() {
    let $http = this.$http;
    $http.get('api/forms')
      .then(res => {
        this.forms = res.data;
      });
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
  sendMessage(form) {
    let aux = {user: this.getCurrentUser().name, message: this.message};
    form.messages.push(aux);
    this.message = '';
    this.updateForm(form);
  }
}

export default angular.module('hemicApp.validation', [uiRouter])
  .config(routes)
  .component('validation', {
    template: require('./validation.html'),
    controller: ValidationComponent,
  })
  .name;
