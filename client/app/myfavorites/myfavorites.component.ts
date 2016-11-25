'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './myfavorites.routes';

export class MyFavoritesComponent {
    message;
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('cs564WebAppApp.myfavorites', [ngRoute])
  .config(routes)
  .component('myfavorites', {
    template: require('./myfavorites.html'),
    controller: MyFavoritesComponent,
    controllerAs: 'myfavoritesCtrl'
  })
  .name;
