'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './composition.routes';

export class CompositionComponent {
  last = {
    bottom: true,
    top: false,
    left: false,
    right: true
  };

  modelFormBasic = [
    {
      type: 'text',
      typeStructure: 'simple',
      class: 'form_model',
      header: 'Text Field',
      options: ''
    }, {
      type: 'number',
      typeStructure: 'simple',
      class: 'form_model',
      header: 'Number',
      options: 0
    }, {
      type: 'checkbox',
      typeStructure: 'complex',
      class: 'form_model',
      header: 'Checkbox Group',
      options: [
        {
          name: 'Option 1',
          value: false
        }, {
          name: 'Option 2',
          value: false
        }
      ]
    }, {
      type: 'select',
      typeStructure: 'complex',
      class: 'form_model',
      header: 'Select',
      options: [
        {
          name: 'Option 1',
          value: 'Option 1'
        }, {
          name: 'Option 2',
          value: 'Option 2'
        }
      ]
    }
  ];
  modelForm = [];

  /*@ngInject*/
  constructor($scope, $mdToast, $mdDialog) {
    this.$scope = $scope;
    this.$mdToast = $mdToast;
    this.$mdDialog = $mdDialog;


    // this.searchText = '';
    // this.message = 'Hello';
    // this.data = [
    //   {
    //     name: 'Prescripción1'
    //   }, {
    //     name: 'Prescripción2'
    //   }
    // ];
    // this.showCombination = false;
    // this.data2 = [
    //   {
    //     name: 'PrincipioActivo | Presentación',
    //     value: [
    //       'Blastina	| Comprimido',
    //       'Blastina | Pulv Nasal',
    //       'Comprimido |	Pulv Nasal'
    //     ]
    //   }, {
    //     name: 'Units',
    //     value: ['mg', 'g', 'kg']
    //   }, {
    //     name: 'Amount',
    //     value: [1, 10, 100]
    //   }
    // ];
  }
  $onInit() {
    let last = this.last;
    let $scope = this.$scope;
    let $mdToast = this.$mdToast;
    let $mdDialog = this.$mdDialog;

    $scope.showModelForm = function() {
      console.log('LLEGAAAA');
      $mdDialog.show({
        contentElement: '#modelForm',
        parent: angular.element(document.body)
      });
    }
    $scope.showSimpleToast = function() {
      var pinTo = $scope.getToastPosition();
      console.log(pinTo);
      $mdToast.show(
        $mdToast.simple()
          .textContent('Para editar asdadasdasdasdasdasdasdadasdasdasd')
          .position(pinTo)
          .hideDelay(3000)
      );
    };
    $scope.toastPosition = angular.extend({}, last);

    $scope.getToastPosition = function() {
      sanitizePosition();

      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };

    function sanitizePosition() {
      var current = $scope.toastPosition;

      if( current.bottom && last.top ) current.top = false;
      if( current.top && last.bottom ) current.bottom = false;
      if( current.right && last.left ) current.left = false;
      if( current.left && last.right ) current.right = false;

      last = angular.extend({},current);
    }
  }

  addText() {
    this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[0])));
  }
  addNumber() {
    this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[1])));
  }
  addCheck() {
    this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[2])));
  }
  addSelect() {
    this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[3])));
  }
  deleteObject(index) {
    this.modelForm.splice(index, 1);
  }
  clear() {
    this.modelForm.splice(0);
  }
  addOptionInCheck(index) {
    this.modelForm[index].options.push({name: 'new option', value: false});
  }
  deleteOptionInCheck(i, j) {
    this.modelForm[i].options.splice(j, 1);
  }
  selected() {
    this.showCombination = true;
    this.searchText = '';
  }
  test() {
    console.log('HOLAAA');
  }
}

export default angular.module('hemicApp.composition', [uiRouter])
  .config(routes)
  .component('composition', {
    template: require('./composition.html'),
    controller: CompositionComponent
  })
  .name;
