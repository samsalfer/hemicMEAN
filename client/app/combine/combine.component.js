'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './combine.routes';

export class CombineComponent {
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.selection = [];
    this.idElementSelected = '';
    this.searchText = '';

  }
  $onInit() {
    this.user = {
      test: ['HOLA']
    }
    this.test = ['A', 'B', 'TU'];
    this.combination = [];
    this.showChecks = false
    this.showFirst = true;
    this.showCombination = false;
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
      this.searchText = "";

    }
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
    this.showCombination = true;

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

export default angular.module('hemicApp.combine', [uiRouter])
  .config(routes)
  .component('combine', {
    template: require('./combine.html'),
    controller: CombineComponent,
 //   controllerAs: 'combineCtrl'
  })
  .name;
