'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './mylist.routes';

export class MylistComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('cs564WebAppApp.mylist', [ngRoute])
  .config(routes)
  .component('mylist', {
    template: require('./mylist.html'),
    controller: MylistComponent,
    controllerAs: 'mylistCtrl'
  })
  .name;
