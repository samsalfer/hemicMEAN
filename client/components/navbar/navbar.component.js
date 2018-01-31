'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
    title: 'Home',
    state: 'main',
    icon: 'home'
  }, {
    title: 'Project',
    state: 'project',
    icon: 'briefcase'
  }, {
    title: 'Terminology',
    state: 'terminology',
    icon: 'book'
  }, {
    title: 'Structure',
    state: 'structure',
    icon: 'share-alt'
  }, {
    title: 'Form',
    state: 'composition',
    icon: 'file-text-o'
  },
  {
    title: 'Repository',
    state: 'validation',
    icon: 'check-square-o'
  }];
  // , {
  //   title: 'Indicators',
  //   state: 'combine',
  //   icon: 'bar-chart'
  // }]
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;

  constructor(Auth) {
    'ngInject';

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
