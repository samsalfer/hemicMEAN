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
    this.user = {
      test: ['HOLA']
    }
    this.test = ['A', 'B', 'TU PUTA MADRE'];
    this.combination = [];
    this.showChecks = false;
    this.$http.get('api/structures')
      .then(res => {
        this.structures = res.data;
        console.log(res.data);
      });
  }
  selected(structure) {
    if(this.selection.indexOf(structure) === -1) {
      structure.elements.forEach(element => {
        element['specificterms'] = {
          names: [],
          datas: []
        };
      });
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

  addItemFromArr(arr, item) {
    if(arr.indexOf(item) === -1) {
      arr.push(item);
    }
  }

  removeItemFromArr(arr, item) {
    let i = arr.indexOf(item);
    arr.splice(i, 1);
  }

  show() {
    this.showChecks = true;
  }

  combineTerms() {
    this.combination = [];
    this.selection.forEach(structure => {
      structure.elements.forEach(element => {
        console.log('eeee');
        if(element.specificterms.names.length > 0) {
          console.log('IF');
          element.terms.forEach(term => {
            console.log('term');
            if(element.specificterms.names.indexOf(term.name) > -1) {
              console.log('PUSH ', term);
              this.combination.push(term);
            }
          });
        }
      });
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
