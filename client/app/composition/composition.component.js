'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './composition.routes';

export class CompositionComponent {
  /*@ngInject*/
  constructor() {
    this.searchText = '';
    this.message = 'Hello';
    this.data = [
      {
        name: 'Prescripción1'
      }, {
        name: 'Prescripción2'
      }
    ];
    this.showCombination = false;
    this.data2 = [
      {
        name: 'PrincipioActivo | Presentación',
        value: [
          'Blastina	| Comprimido',
          'Blastina | Pulv Nasal',
          'Comprimido |	Pulv Nasal'
        ]
      }, {
        name: 'Units',
        value: ['mg', 'g', 'kg']
      }, {
        name: 'Amount',
        value: [1, 10, 100]
      }
    ];
  }

  selected() {
    this.showCombination = true;
    this.searchText = '';
  }
}

export default angular.module('hemicApp.composition', [uiRouter])
  .config(routes)
  .component('composition', {
    template: require('./composition.html'),
    controller: CompositionComponent
  })
  .name;
