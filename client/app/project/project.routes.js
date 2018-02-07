'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('project', {
      url: '/project',
      template: '<project></project>',
      controller($state, Auth) {
        'ngInject';
        if(!Auth.isLoggedInSync()){
          $state.go('login');
        };
      }
    });
}
