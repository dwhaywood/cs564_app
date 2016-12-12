'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './recipe.routes';
import './recipe.css';

export class RecipeComponent {
    Recipe;
    recipeData;
    nutritionInfo;
    $http;
    id;
    $routeParams
    resolve;
    close;
    nutrientAttributes;
    
  /*@ngInject*/
  constructor(Recipe,$http,$routeParams) {
    this.Recipe =Recipe;
      this.$http = $http;
      this.$routeParams = $routeParams;
      this.recipeData = {};
  }
  $onInit = () => {
      this.id = this.$routeParams.id || this.resolve.id;
      //console.log(this.id)
      if (this.id) {
          this.Recipe.get({id:this.id,includeIngredients: true, includeNutrients: true}, this.loaddata)
          
      }
      this.$http.get('/api/nutrition-attributess/',{params:{RecipeId: this.id}}).then((res)=>{
        var attributes = res.data;
        this.nutrientAttributes = {};
        for (var attribute in attributes) {
            if (attributes.hasOwnProperty(attribute)){
                this.nutrientAttributes[attributes[attribute].attribute]= attributes[attribute];

            }
        }
        console.log(this.nutrientAttributes);
      });
  }
    cancel() {
      this.close({$value: 'cancel'});
    };
  $routerOnActive= (next) => {
      this.id= next.params.id;
  }
  loaddata = (res) =>{
      this.recipeData = res;
      console.log(this.recipeData);
  }
}

export default angular.module('cs564WebAppApp.recipe', [ngRoute])
  .config(routes)
  .component('recipe', {
    template: require('./recipe.html'),
    controller: RecipeComponent,
    controllerAs: 'recipeCtrl',
    bindings: { id: '<', resolve: '<', close: '&'}
  })
  .name;
