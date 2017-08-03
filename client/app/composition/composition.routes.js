'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('composition', {
      url: '/composition',
      template: '<composition></composition>'
    });
}
