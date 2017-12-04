'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import _ from 'lodash';
import routes from './composition.routes';

export class CompositionComponent {
  last = {
    bottom: true,
    top: false,
    left: false,
    right: true
  };
  flagForm = true;
  combineElements = [];
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
      type: 'checkbox',
      typeStructure: 'complex',
      typeShow: 'item',
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
      typeShow: 'item',
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
      typeShow: 'item',
      class: 'form_model',
      header: 'Text Area',
      value: '',
      maxLength: 2,
      rows: 4
    }, {
      type: 'radioGroup',
      typeStructure: 'complex',
      typeShow: 'item',
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
      typeShow: 'item',
      class: 'header',
      header: 'Header',
      options: ''
    }, {
      type: 'header',
      typeStructure: 'text',
      typeShow: 'item',
      class: 'paragraph',
      header: 'Paragraph',
      value: ''
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
      type: 'section',
      typeStructure: 'text',
      typeShow: 'container',
      class: 'header',
      header: 'Table',
      value: '',
      multiple: true,
      container: [
      ]
    }, {
      type: 'file',
      typeStructure: 'file',
      typeShow: 'item',
      class: 'file',
      header: 'File',
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

    $scope.showModelForm = function(modelElement) {
      $mdDialog.show({
        contentElement: modelElement,
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
  addSection() {
    this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[9])));
  }
  addTable() {
    this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[10])));
  }
  addFile() {
    this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[11])));
  }
  deleteObject(modelsN, model) {
    console.log(model);
    let models = modelsN ? modelsN : this.modelForm;
    let index = models.indexOf(model);
    if(index < 0) {
      models.forEach(m => {
        if(m.type === 'section') {
          this.deleteObject(m.container, model);
        }
      });
    } else {
      models.splice(index, 1);
    }
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
      this.modelForm.push(angular.copy(f));
    });
  }

  // changeType(index) {
  //   var oldType = this.modelForm[index].type;
  //   var oldOptions = this.modelForm[index].options;
  //   var oldHeader = this.modelForm[index].header;
  //   var model = JSON.parse(JSON.stringify(this.modelFormBasic[3]));
  //   model.edit = 'true';
  //   model.header = oldHeader;
  //   model.typeInformationModel = oldType;
  //   if(oldOptions !== undefined) {
  //     model.options = oldOptions;
  //   }
  //   this.modelForm.splice(index, 1, JSON.parse(JSON.stringify(model)));
  // }
  changeType(modelsN, model, type) {
    let models = modelsN ? modelsN : this.modelForm;
    let index = models.indexOf(model);
    if(index < 0) {
      models.forEach(m => {
        if(m.type === 'section') {
          this.changeType(m.container, model, type);
        }
      });
    } else {
      var oldType = models.selected.type;
      var oldOptions = models.selected.options;
      var oldHeader = models.selected.header;
      var modelAux = JSON.parse(JSON.stringify(this.modelFormBasic[type]));
      modelAux.edit = 'true';
      modelAux.header = oldHeader;
      modelAux.typeInformationModel = oldType;
      if(oldOptions !== undefined) {
        modelAux.options = oldOptions;
      }
      models.splice(index, 1,JSON.parse(JSON.stringify(modelAux)));
    }
  }

  saveForm() {
    // Esto funcionaba!
    let object = {
      name: this.nameForm,
      form: this.modelForm
    }
    // Esto funcionaba!
    this.$http.post('api/forms', object)
      .then(() => {
        this.$http.get('api/forms')
          .then(res => {
            this.modelFormCustom = res.data;
            console.log(res);
            console.log('---------------------------');
            console.log(this.modelFormCustom);
          });
      });
    //HASTA AQUI
    // let object = {
    //   name: this.nameForm,
    //   form: [],
    // };
    // this.modelForm.forEach(element => {
    //   if(element.type !== 'section') {
    //     this.$http.post('api/elements', element)
    //      .then(res => {
    //        console.log(res);
    //        console.log(res.data._id);
    //        object.form.push(res.data._id);
    //        console.log(object);
    //      });
    //   } else {
    //     console.log('SECTIONNNNN NOOOOOOOOOOOOOOOOOOOOOO');
    //   }
    // });
    // console.log('Antes de :', object);
    // this.$http.post('api/forms', object).then(res1 => {
    //   console.log(res1.data);
    //   this.$http.get('api/forms')
    //     .then(res => {
    //       this.modelFormCustom = res.data;
    //       console.log(res);
    //       console.log('---------------------------');
    //       console.log(this.modelFormCustom);
    //     });
    // });
  }
  // AddCombine Elements
  addCombineElement(model) {
    if(model.selectCombineElement === true) {
      this.combineElements.push(model);
    }
    else {
      this.combineElements.splice(this.combineElements.indexOf(model));
    }
    console.log(this.combineElements);
  }
  combineFunction() {
    var oldHeaderCombine = '';
    var oldOptions = [];
    var newOptions = [];
    var modelAux = JSON.parse(JSON.stringify(this.modelFormBasic[3]));

    this.combineElements.forEach(m => {
      oldHeaderCombine += m.header + '-';
      oldOptions.push(m.options);
    });
    oldHeaderCombine = oldHeaderCombine.slice(0, -1);

    oldOptions[0].forEach(combineA => {
      oldOptions[1].forEach(combineB => {
        newOptions.push({
          name: combineA.name + ' - ' + combineB.name,
          value: combineA.value + ' - ' + combineB.value
        });
      });
    });
    modelAux.header = oldHeaderCombine;
    modelAux.options = newOptions;
    this.modelForm.push(JSON.parse(JSON.stringify(modelAux)));
  }
}

export default angular.module('hemicApp.composition', [uiRouter, 'dndLists'])
  .config(routes)
  .component('composition', {
    template: require('./composition.html'),
    controller: CompositionComponent
  })
  .name;
