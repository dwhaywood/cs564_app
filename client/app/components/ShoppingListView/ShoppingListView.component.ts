'use strict';
const angular = require('angular');

export class ShoppingListViewComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'World';
  }
}

export default angular.module('cs564WebAppApp.ShoppingListView', [])
  .component('ShoppingListView', {
    template: '<h1>Hello {{ $ctrl.message }}</h1>',
    bindings: { message: '<' },
    controller: ShoppingListViewComponent
  })
  .name;
