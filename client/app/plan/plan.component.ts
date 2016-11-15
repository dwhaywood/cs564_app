'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './plan.routes';

export class PlanComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('cs564WebAppApp.plan', [ngRoute])
  .config(routes)
  .component('plan', {
    template: require('./plan.html'),
    controller: PlanComponent,
    controllerAs: 'planCtrl'
  })
  .name;
