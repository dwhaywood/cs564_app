'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './recipe.routes';

export class RecipeComponent {
    Recipe;
    recipeData;
    nutritionInfo;
    $http;
    id;
  /*@ngInject*/
  constructor(Recipe,$http) {
    this.Recipe =Recipe;
      this.$http = $http;
  }
  $onInit = () => {
      this.recipeData = this.Recipe.get({_id:this.id});
      
      
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
