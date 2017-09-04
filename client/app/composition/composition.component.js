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
      value: '',
      maxLength: 2
    }, {
      type: 'number',
      typeStructure: 'simple',
      class: 'form_model',
      header: 'Number',
      value: 0
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
      value: '',
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
    }, {
      type: 'textArea',
      typeStructure: 'textArea',
      class: 'form_model',
      header: 'Text Area',
      value: '',
      rows: 4
    }, {
      type: 'radioGroup',
      typeStructure: 'complex',
      class: 'form_model',
      header: 'Radio Group',
      value: '',
      options: [
        {
          name: 'Option 1',
          value: 'Option 1'
        }, {
          name: 'Option 2',
          value: 'Option 2'
        }
      ]
    }, {
      type: 'header',
      typeStructure: 'text',
      class: 'header',
      header: 'Header',
      options: ''
    }, {
      type: 'paragraph',
      typeStructure: 'text',
      class: 'paragraph',
      header: 'Paragraph',
      value: ''
    }, {
      type: 'dateField',
      typeStructure: 'dateField',
      class: 'form_model',
      header: 'Date Field',
      value: ''
    }
  ];
  modelFormCustom = [];
  modelForm = [];
  nameForm = '';
  example = [];
    // [
    //   {
    //     type: 'text',
    //     typeStructure: 'simple',
    //     class: 'form_model',
    //     header: 'Soy un máquina',
    //     options: 'Rellena los datos'
    //   },
    //   {
    //     type: 'text',
    //     typeStructure: 'simple',
    //     class: 'form_model',
    //     header: 'Tipo Text',
    //     options: 'Rellena los datos'
    //   }
    // ],
    // [
    //   {
    //     type: 'text',
    //     typeStructure: 'simple',
    //     class: 'form_model',
    //     header: 'Tipo Text',
    //     options: 'Rellena los datos'
    //   },
    //   {
    //     type: 'text',
    //     typeStructure: 'simple',
    //     class: 'form_model',
    //     header: 'Tipo Text',
    //     options: 'Rellena los datos'
    //   }
    // ]
  // ];
  /*@ngInject*/
  constructor($scope, $mdToast, $mdDialog, $http) {
    this.$scope = $scope;
    this.$mdToast = $mdToast;
    this.$mdDialog = $mdDialog;
    this.$http = $http;


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
    let $http = this.$http;

    $http.get('api/forms')
      .then(res => {
        this.modelFormCustom = res.data;
        console.log(res);
        console.log('---------------------------');
        console.log(this.modelFormCustom);
      })

    $scope.showModelForm = function() {
      $mdDialog.show({
        contentElement: '#modelForm',
        parent: angular.element(document.body)
      });
    }
    $scope.hideModelForm = function() {
      $mdDialog.hide();
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

      last = angular.extend({}, current);
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
  addTextArea() {
    this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[4])));
  }
  addRadioGroup() {
    this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[5])));
  }
  addHeader() {
    this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[6])));
  }
  addParagraph() {
    this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[7])));
  }
  addDateField() {
    this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[8])));
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
  // selected() {
  //   this.showCombination = true;
  //   this.searchText = '';
  // }
  // // add a personalized form created
  addPersonalizedForm() {
    console.log(this.example);

    angular.forEach(this.example, value => {
      angular.forEach(value, object => {
        this.modelForm.push(JSON.parse(JSON.stringify(object)));
      });
    });
  }

  addOnePersonalizedForm() {
    angular.forEach(this.example[3], value => {
      this.modelForm.push(JSON.parse(JSON.stringify(value)));
    });
  }

  addFormCustom(form) {

    form.forEach(f => {
      this.modelForm.push(f);
    });
  }

  saveForm() {
    let object = {
      name: this.nameForm,
      form: this.modelForm
    }
    // this.example = [];
    // this.example(angular.copy(this.modelForm));
    console.log(object);
    this.$http.post('api/forms', object);
  }
}

export default angular.module('hemicApp.composition', [uiRouter])
  .config(routes)
  .component('composition', {
    template: require('./composition.html'),
    controller: CompositionComponent
  })
  .name;
