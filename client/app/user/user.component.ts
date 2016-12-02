'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './user.routes';

export class UserComponent {
  /*@ngInject*/
  constructor() {
    //this.message = 'Hello';
  }
}

export default angular.module('cs564WebAppApp.user', [ngRoute])
  .config(routes)
  .component('user', {
    template: require('./user.html'),
    controller: UserComponent,
    controllerAs: 'userCtrl'
  })
  .name;
