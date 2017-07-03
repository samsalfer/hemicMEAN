'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('structure', {
      url: '/structure',
      template: '<structure></structure>'
    });
}
