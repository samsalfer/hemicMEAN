'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './structure.routes';

export class StructureComponent {
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.idSelected = '';
    this.idElementSelected = '';
  }
  $onInit() {
    this.$http.get('api/structures')
      .then(res => {
        this.structures = res.data;
      });
  }
  selected(id) {
    this.idSelected = id;
  }

  elementSelected(id) {
    this.idElementSelected = id;
    this.$http.get('api/elements/' + id)
      .then(res => {
        this.elements = res.data;
      });
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
