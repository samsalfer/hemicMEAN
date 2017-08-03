'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('combine', {
      url: '/combine',
      template: '<combine></combine>'
    });
}
