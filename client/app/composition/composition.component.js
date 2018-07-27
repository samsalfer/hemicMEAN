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
      maxLength: 100
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
          display: 'Option 1',
          value: false,
          code: 'Option 1'
        }, {
          display: 'Option 2',
          value: false,
          code: 'Option 2'
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
          display: 'Option 1',
          value: 'Option 1',
          code: 'Option 1'
        }, {
          display: 'Option 2',
          value: 'Option 2',
          code: 'Option 2'
        }
      ]
    }, {
      type: 'textArea',
      typeStructure: 'textArea',
      typeShow: 'item',
      class: 'form_model',
      header: 'Text Area',
      value: '',
      maxLength: 100,
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
          display: 'Option 1',
          value: 'Option 1',
          code: 'Option 1'
        }, {
          display: 'Option 2',
          value: 'Option 2',
          code: 'Option 2'
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
    }, {
      type: 'tab',
      typeStructure: 'text',
      typeShow: 'container',
      class: 'header',
      header: 'Tab',
      value: '',
      hidden: false,
      container: [
      ]
    },
    {
      type: 'select',
      typeStructure: 'complex',
      typeShow: 'item',
      value: '',
      class: 'form_model',
      header: 'Index',
      options: [
        {
          display: 'Option 1',
          value: 'Option 1',
          code: 'Value 1'
        }, {
          display: 'Option 2',
          value: 'Option 2',
          code: 'Value 2'
        }
      ]
    }
  ];
  modelFormCustom = [];
  modelForm = [
    {
      type: 'tab',
      typeStructure: 'text',
      typeShow: 'container',
      class: 'header',
      header: 'Tab',
      value: '',
      hidden: true,
      container: [
      ]
    }];
  nameForm = '';
  languageForm = '';
  projectForm = '';
  versionForm = '';
  allItemsForm = [];
  allSelectItems = [];

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
  modelsN;
  modelz;
  keepGoing = true;

  /*@ngInject*/
  constructor($scope, $mdToast, $mdDialog, $http, Auth) {
    this.$scope = $scope;
    this.$mdToast = $mdToast;
    this.$mdDialog = $mdDialog;
    this.$http = $http;
    this.getCurrentUser = Auth.getCurrentUserSync;


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
    console.log('Composition.componenet.js')
    let last = this.last;
    let $scope = this.$scope;
    let $mdToast = this.$mdToast;
    let $mdDialog = this.$mdDialog;
    let $http = this.$http;
    this.chooseModel(null, this.modelForm[0]);
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
    this.selectCorrectObject(JSON.parse(JSON.stringify(this.modelFormBasic[0])));
    // this.modelForm[0].container.push(JSON.parse(JSON.stringify(this.modelFormBasic[0])));
  }
  addNumber() {
    this.selectCorrectObject(JSON.parse(JSON.stringify(this.modelFormBasic[1])));
    // this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[1])));
  }
  addCheck() {
    this.selectCorrectObject(JSON.parse(JSON.stringify(this.modelFormBasic[2])));

    // this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[2])));
  }
  addSelect() {
    this.selectCorrectObject(JSON.parse(JSON.stringify(this.modelFormBasic[3])));

    // this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[3])));
  }
  addTextArea() {
    this.selectCorrectObject(JSON.parse(JSON.stringify(this.modelFormBasic[4])));

    // this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[4])));
  }
  addRadioGroup() {
    this.selectCorrectObject(JSON.parse(JSON.stringify(this.modelFormBasic[5])));

    // this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[5])));
  }
  addHeader() {
    this.selectCorrectObject(JSON.parse(JSON.stringify(this.modelFormBasic[6])));

    // this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[6])));
  }
  addParagraph() {
    this.selectCorrectObject(JSON.parse(JSON.stringify(this.modelFormBasic[7])));

    // this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[7])));
  }
  addDateField() {
    this.selectCorrectObject(JSON.parse(JSON.stringify(this.modelFormBasic[8])));

    // this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[8])));
  }
  addSection() {
    this.selectCorrectObject(JSON.parse(JSON.stringify(this.modelFormBasic[9])));

    // this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[9])));
  }
  addTable() {
    this.selectCorrectObject(JSON.parse(JSON.stringify(this.modelFormBasic[10])));

    // this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[10])));
  }
  addFile() {
    this.selectCorrectObject(JSON.parse(JSON.stringify(this.modelFormBasic[11])));

    // this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[11])));
  }
  addMagnitude() {
    this.selectCorrectObject(JSON.parse(JSON.stringify(this.modelFormBasic[12])));

    // this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[12])));
  }
  addAutocalculated() {
    this.selectCorrectObject(JSON.parse(JSON.stringify(this.modelFormBasic[13])));

    // this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[13])));
  }
  addTab() {
    this.modelForm.push(JSON.parse(JSON.stringify(this.modelFormBasic[14])));
  }
  addIndex() {
    this.selectCorrectObject(JSON.parse(JSON.stringify(this.modelFormBasic[15])));
  }

  //guardo cuando pulso un elemento
  chooseModel(modelsN, modelz){
    this.modelsN = modelsN;
    this.modelz = modelz;
    // this.selectCorrectObject();
  }

  hiddeTabs(index){
    this.modelForm.forEach(m => {
      if(m.type == 'tab'){
        m.hidden = false;
      }
    });
    this.modelForm[index].hidden = true;
    this.chooseModel(null, this.modelForm[index]);
  }

  //selecciono el objecto correcto dentro de una sección y le añado el elemento
  selectCorrectObject(element){
    let models = this.modelsN ? this.modelsN : this.modelForm;
    this.keepGoing = true;
    if(this.modelz) {
      console.log(models);
      let index = models.indexOf(this.modelz);
      if (index < 0) {
        models.forEach(m => {
          if ((m.type === 'section' || m.type === 'tab') && this.keepGoing) {
            console.log('entra a cambiar el modelSN');
            this.modelsN = m.container;
            this.modelz = this.modelz;
            this.selectCorrectObject(element);
          }
        });
      } else {
        if(models[index].type == 'tab'){
          var zone = models[index].container;
          zone.push(element);
          this.keepGoing = false;
        }
        else {
          models.splice(index + 1, 0, element);
          this.keepGoing = false;
        }
      }

    }
    else{
      models.push(element);
    }
  }
  deleteObject(modelsN, model) {
    console.log(model);
    this.modelsN = null;
    this.modelz = null;
    let models = modelsN ? modelsN : this.modelForm;
    let index = models.indexOf(model);
    if(index < 0) {
      models.forEach(m => {
        if(m.type === 'section' || m.type === 'tab') {
          this.deleteObject(m.container, model);
        }
      });
    } else {
      models.splice(index, 1);
    }
  }
  clear() {
    this.modelsN = null;
    this.modelz = null;
    this.modelForm.splice(0);
  }
  addOptionInCheck(modelsN, model, indexOption) {
    let models = modelsN ? modelsN : this.modelForm;
    let index = models.indexOf(model);
    if(index < 0) {
      models.forEach(m => {
        if(m.type === 'section' || m.type === 'tab') {
          this.addOptionInCheck(m.container, model, indexOption);
        }
      });
    } else {
      models[indexOption].options.push({display: 'new option', value: false});
    }
  }
  deleteOptionInCheck(modelsN, model,i, j) {
    let models = modelsN ? modelsN : this.modelForm;
    let index = models.indexOf(model);
    if(index < 0) {
      models.forEach(m => {
        if(m.type === 'section' || m.type === 'tab') {
          this.deleteOptionInCheck(m.container, model,i, j);
        }
      });
    } else {
      models[i].options.splice(j, 1);
    }
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
      this.selectCorrectObject(angular.copy(f));
      // this.modelForm.push(angular.copy(f));
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
        if(m.type === 'section' || m.type === 'tab') {
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


  // Consigue todos los elementos del formulario
  getAllItems(container){
    container.forEach(i => {
      if(i.typeShow == 'container'){
        this.getAllItems(i.container);
      }
      else{
        this.allItemsForm.push(i);
        if(i.typeStructure == 'complex')
          this.allSelectItems.push(i);
      }
    })
  }

  //limpia allItemsForm
  clearAllItems(){
    console.log('Entra');
    this.allItemsForm = [];
    this.allSelectItems = [];

    this.getAllItems(this.modelForm);

  }
  saveForm() {
    let getCurrentUser2 = this.getCurrentUser();

    let object = {
      name: this.nameForm,
      version: this.versionForm,
      language: this.languageForm,
      project: this.projectForm,
      form: this.modelForm,
      mode: 'form',
    }
    // Esto funcionaba!
    this.$http.post('api/forms', object)
      .then(body => {
        if(body && body.status === 201) {
          getCurrentUser2.projects.find(x => x._id === body.data.project).forms.push(body.data);
        }
      })
      .catch(err => {
        console.log('Err', err);
      })
      .then(() => {
        this.$http.get('api/forms')
          .then(res => {
            this.modelFormCustom = res.data;
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
      this.combineElements.splice(this.combineElements.indexOf(model), 1);
    }
    console.log('Combine' + this.combineElements);
  }
  combineFunction() {
    var oldHeaderCombine = '';
    var oldOptions = [];
    var newOptions = [];
    var modelAux = JSON.parse(JSON.stringify(this.modelFormBasic[3]));

    this.combineElements.forEach(m => {
      m.selectCombineElement = false; //pongo el select a falso en la interfaz
      oldHeaderCombine += m.header + '-';
      oldOptions.push(m.options);
    });
    oldHeaderCombine = oldHeaderCombine.slice(0, -1);

    oldOptions[0].forEach(combineA => {
      oldOptions[1].forEach(combineB => {
        newOptions.push({
          display: combineA.display + ' - ' + combineB.display,
          code: combineA.code + ' | ' + combineB.code
        });
      });
    });
    modelAux.header = oldHeaderCombine;
    modelAux.options = newOptions;
    this.modelForm.push(JSON.parse(JSON.stringify(modelAux)));
    this.combineElements = [];
  }
}

export default angular.module('hemicApp.composition', [uiRouter, 'dndLists'])
  .config(routes)
  .component('composition', {
    template: require('./composition.html'),
    controller: CompositionComponent
  })
  .name;
