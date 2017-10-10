import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import 'angular-drag-and-drop-lists';

export class MainController {
  $http;
  socket;
  awesomeThings = [];
  modelFormBasic = [
    {
      type: 'text',
      typeStructure: 'simple',
      class: 'form_model',
      header: 'Tipo Text',
      options: 'Rellena los datos'
    }, {
      type: 'number',
      typeStructure: 'simple',
      class: 'form_model',
      header: 'Tipo Number',
      options: 123
    }, {
      type: 'checkbox',
      typeStructure: 'complex',
      class: 'form_model',
      header: 'Tipo Checkbox',
      options: [
        {
          name: 'check1',
          value: true
        }, {
          name: 'check2',
          value: false
        }
      ]
    }
  ];
  modelForm = [];
  newThing = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.$scope = $scope;
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    let $scope = this.$scope;
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
    this.modelForm = [
      {
        type: 'text',
        typeStructure: 'simple',
        class: 'form_model',
        header: 'Tipo Text',
        options: 'Rellena los datos'
      }, {
        type: 'number',
        typeStructure: 'simple',
        class: 'form_model',
        header: 'Tipo Number',
        options: 123
      }, {
        type: 'checkbox',
        typeStructure: 'complex',
        class: 'form_model',
        header: 'Tipo Checkbox',
        options: [
          {
            name: 'check1',
            value: true
          }, {
            name: 'check2',
            value: false
          }
        ]
      }
    ];
    $scope.models = {
      selected: null,
      lists: {A: [], B: []}
    };

    // Generate initial model
    for(let i = 1; i <= 3; ++i) {
      $scope.models.lists.A.push({label: 'Item A' + i});
      $scope.models.lists.B.push({label: 'Item B' + i});
    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
      $scope.modelAsJson = angular.toJson(model, true);
    }, true);
    $scope.models = {
      selected: null,
      templates: [
        {type: "item", id: 2},
        {type: "container", id: 1, columns: [[], []]}
      ],
      dropzones: {
        "A": [
          {
            "type": "container",
            "id": 1,
            "columns": [
              [
                {
                  "type": "item",
                  "id": "1"
                },
                {
                  "type": "item",
                  "id": "2"
                }
              ],
              [
                {
                  "type": "item",
                  "id": "3"
                }
              ]
            ]
          },
          {
            "type": "item",
            "id": "4"
          },
          {
            "type": "item",
            "id": "5"
          },
          {
            "type": "item",
            "id": "6"
          }
        ],
        "B": [
          {
            "type": "item",
            "id": 7
          },
          {
            "type": "item",
            "id": "8"
          },
          {
            "type": "container",
            "id": "2",
            "columns": [
              [
                {
                  "type": "item",
                  "id": "9"
                },
                {
                  "type": "item",
                  "id": "10"
                },
                {
                  "type": "item",
                  "id": "11"
                }
              ],
              [
                {
                  "type": "item",
                  "id": "12"
                },
                {
                  "type": "container",
                  "id": "3",
                  "columns": [
                    [
                      {
                        "type": "item",
                        "id": "13"
                      }
                    ],
                    [
                      {
                        "type": "item",
                        "id": "14"
                      }
                    ]
                  ]
                },
                {
                  "type": "item",
                  "id": "15"
                },
                {
                  "type": "item",
                  "id": "16"
                }
              ]
            ]
          },
          {
            "type": "item",
            "id": 16
          }
        ]
      }
    };

    $scope.$watch('models.dropzones', function(model) {
      $scope.modelAsJson = angular.toJson(model, true);
    }, true);

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
  addOptionInCheck(index) {
    this.modelForm[index].options.push({name: 'new option', value: false});
  }
  deleteOptionInCheck(i, j) {
    this.modelForm[i].options.splice(j, 1);
  }
  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }

}

export default angular.module('hemicApp.main', [uiRouter, 'dndLists'])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
