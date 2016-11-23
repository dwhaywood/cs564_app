'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './recipe.routes';

export class RecipeComponent {
    message;
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('cs564WebAppApp.recipe', [ngRoute])
  .config(routes)
  .component('recipe', {
    template: require('./recipe.html'),
    controller: RecipeComponent,
    controllerAs: 'recipeCtrl'
  })
  .name;
