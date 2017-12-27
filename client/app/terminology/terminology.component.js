'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './terminology.routes';

export class TerminologyComponent {
  modelFormBasic = [
    {
      type: 'text',
      typeStructure: 'simple',
      typeShow: 'item',
      class: 'form_model',
      header: 'Text Field',
      value: '',
      maxLength: 2
    }, {
      type: 'number',
      typeStructure: 'simple',
      typeShow: 'item',
      class: 'form_model',
      header: 'Number',
      maxValue: 1000,
      minValue: 0,
      value: 0
    }, {
      type: 'select',
      typeStructure: 'complex',
      typeShow: 'item',
      value: '',
      class: 'form_model',
      header: 'Select',
      options: [
        {
          display: 'Option 1',
          value: 'Option 1'
        }, {
          display: 'Option 2',
          value: 'Option 2'
        }
      ]
    }, {
      type: 'dateField',
      typeStructure: 'dateField',
      typeShow: 'item',
      class: 'form_model',
      header: 'Date Field',
      value: ''
    }, {
      type: 'section',
      typeStructure: 'text',
      typeShow: 'container',
      class: 'header',
      header: 'Section',
      value: '',
      container: [
      ]
    }, {
      type: 'magnitude',
      typeStructure: 'simple',
      typeShow: 'item',
      class: 'form_model',
      header: 'Magnitude',
      unit: '',
      maxValue: 1000,
      minValue: 0,
      value: 0
    }, {
      type: 'auto',
      typeStructure: 'simple',
      typeShow: 'item',
      class: 'form_model',
      header: 'Autocalculated',
      unit: '',
      maxValue: 1000,
      minValue: 0,
      value: 0
    }
  ];
  source = [];
  selectList = [];
  modelForm = [];
  nameForm='';
  termForImport = [];
  typeForCreate = -1;
  searchText='';
  /*@ngInject*/
  constructor($scope, $mdDialog, $http) {
    this.message = 'Hello';
    this.$http = $http;
    this.$scope = $scope;
    this.$mdDialog = $mdDialog;
  }
  $onInit() {
    let $scope = this.$scope;
    let $mdDialog = this.$mdDialog;
    this.$http.get('api/terminologys')
      .then(res => {
        console.log(res.data);
        this.source = res.data;
      });
    this.getTerminologies('');

    $scope.showModelForm = function(modelElement) {
      $mdDialog.show({
        contentElement: modelElement,
        parent: angular.element(document.body)
      });
    }
    $scope.hideModelForm = function() {
      $mdDialog.hide();
    };
  }

  getTerminologies(filter) {
    this.$http.get('api/terminologys?filter=' + filter)
      .then(res => {
        this.source = res.data;
      });
  }
  addAll() {
    this.selectList = this.selectList.concat(this.source);
    this.source = [];
  }
  addSelect() {
    this.selectList = this.selectList.concat(this.selections);
    this.source = _.differenceWith(this.source, this.selections);
  }
  // Utilizo un termino para crear un elemento del form
  addSelectLinkeName() {
    if(this.termForImport.length > 0) {
      this.source = this.source.concat(this.termForImport[0]);
    }
    this.termForImport = (this.selections);
    this.source = _.differenceWith(this.source, this.selections);
    this.nameForm = this.termForImport[0].display;
  }
  removeAll() {
    this.source = this.source.concat(this.selectList);
    this.selectList = [];
  }
  removeSelect() {
    this.source = this.source.concat(this.selections2);
    this.selectList = _.differenceWith(this.selectList, this.selections2);
  }
  //funcion para convertir una terminología a un select
  createForm() {
    let aux = (JSON.parse(JSON.stringify(this.modelFormBasic[this.typeForCreate])));

    aux.header = this.nameForm;
    aux.code = this.termForImport[0].code;
    aux.terminology = this.termForImport[0].terminology;
    aux.version = this.termForImport[0].version;
    aux.options = this.selectList;
    this.modelForm.push(aux);
    this.saveForm();
  }
  //funcion para guardar el formulario
  saveForm() {
    let object = {
      name: this.nameForm,
      form: this.modelForm,
      mode: 'terminology',
    }
    this.$http.post('api/forms', object)
      .then(() => {
        this.$http.get('api/forms')
          .then(res => {
            this.modelFormCustom = res.data;
          });
      });
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
