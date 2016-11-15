'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './myplan.routes';

export class MyplanComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('cs564WebAppApp.myplan', [ngRoute])
  .config(routes)
  .component('myplan', {
    template: require('./myplan.html'),
    controller: MyplanComponent,
    controllerAs: 'myplanCtrl'
  })
  .name;
