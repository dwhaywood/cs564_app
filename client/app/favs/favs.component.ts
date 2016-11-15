'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './favs.routes';

export class FavsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('cs564WebAppApp.favs', [ngRoute])
  .config(routes)
  .component('favs', {
    template: require('./favs.html'),
    controller: FavsComponent,
    controllerAs: 'favsCtrl'
  })
  .name;
