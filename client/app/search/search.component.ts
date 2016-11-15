'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './search.routes';

export class SearchComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('cs564WebAppApp.search', [ngRoute])
  .config(routes)
  .component('search', {
    template: require('./search.html'),
    controller: SearchComponent,
    controllerAs: 'searchCtrl'
  })
  .name;
