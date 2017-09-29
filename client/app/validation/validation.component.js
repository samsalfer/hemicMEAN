'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './validation.routes';

export class ValidationComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('hemicApp.validation', [uiRouter])
  .config(routes)
  .component('validation', {
    template: require('./validation.html'),
    controller: ValidationComponent,
    controllerAs: 'validationCtrl'
  })
  .name;
