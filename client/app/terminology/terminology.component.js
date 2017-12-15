'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './terminology.routes';

export class TerminologyComponent {
  source = [];
  selectList = [{name: 'a'}, {name: 'b'}, {name: 'c'}];
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('hemicApp.terminology', [uiRouter])
  .config(routes)
  .component('terminology', {
    template: require('./terminology.html'),
    controller: TerminologyComponent,
    // controllerAs: 'terminologyCtrl'
  })
  .name;
