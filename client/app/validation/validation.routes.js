'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('validation', {
      url: '/validation',
      template: '<validation></validation>'
    });
}
