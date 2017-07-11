'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './structure.routes';

export class StructureComponent {
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.selection = [];
    this.idElementSelected = '';
  }
  $onInit() {
    this.$http.get('api/structures')
      .then(res => {
        this.structures = res.data;
        console.log(res.data);
      });
  }
  selected(structure) {
    if(this.selection.indexOf(structure) === -1) {
      this.selection.push(structure);
    }
  }

  elementOfStructureSelected(idStructure, idElement) {
    this.selection.forEach(s => {
      if(s._id === idStructure) {
        s.elements.forEach(e => {
          if(e._id === idElement) {
            console.log(e);
            this.elementSelected = e;
          }
        });
      }
    });
  }

  removeItemFromArr(arr, item) {
    let i = arr.indexOf(item);
    arr.splice(i, 1);
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
