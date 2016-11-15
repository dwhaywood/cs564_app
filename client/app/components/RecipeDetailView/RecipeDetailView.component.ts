'use strict';
const angular = require('angular');

export class RecipeDetailViewComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'World';
  }
}

export default angular.module('cs564WebAppApp.RecipeDetailView', [])
  .component('RecipeDetailView', {
    template: '<h1>Hello {{ $ctrl.message }}</h1>',
    bindings: { message: '<' },
    controller: RecipeDetailViewComponent
  })
  .name;
