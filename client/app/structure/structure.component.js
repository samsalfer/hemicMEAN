'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './structure.routes';

export class StructureComponent {
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.message = 'Hello';
    this.idSelected = '';
  }
  $onInit() {
    this.$http.get('api/structures')
      .then(res => {
        console.log(res);
        this.structures = res.data;
      });
  }
  selected(id){
    console.log('ENTRAAA');
    this.idSelected = id;
  }
}

export default angular.module('hemicApp.structure', [uiRouter])
  .config(routes)
  .component('structure', {
    template: require('./structure.html'),
    controller: StructureComponent
    // controllerAs: 'structureCtrl'
  })
  .name;
