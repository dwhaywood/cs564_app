'use strict';
const angular = require('angular');

export class RecipeListViewComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'World';
  }
}

export default angular.module('cs564WebAppApp.RecipeListView', [])
  .component('RecipeListView', {
    template: '<h1>Hello {{ $ctrl.message }}</h1>',
    bindings: { message: '<' },
    controller: RecipeListViewComponent
  })
  .name;
