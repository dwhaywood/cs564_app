'use strict';
const angular = require('angular');

export class recipeselectmodalComponent {
    selectedrecipe;
    suggestedRecipes;
    favoriteRecipes;
    dismiss;
    close;
    mealtime;
    date;
    resolve;
    Recipe;
    querier;

    /*@ngInject*/
    constructor(Recipe,querier) {
        this.Recipe = Recipe;
        this.querier = querier;
    }
    
    $onInit(){
        //Populate suggested and favorite tables
        this.mealtime= this.resolve.meal;
        this.date= this.resolve.day;
        var results = this.querier.query({name: 'Find30Recipes'},() =>{
            console.log(results);
            this.favoriteRecipes = results[0];
        });
    }
    
    selectRecipe(recipeid){
        this.favoriteRecipes;
    }
    
    ok() {
      this.close({$value: this.selectedrecipe});
    };

    cancel() {
      this.dismiss({$value: 'cancel'});
    };
    
}

export default angular.module('cs564WebAppApp.myplan.recipeselectmodal', [])
  .component('recipeselectmodal', {
    template: require('./recipeselectmodal.html'),
    bindings: { resolve: '<', recipeSelected: '&', close: '&',
    dismiss: '&' },
    controller: recipeselectmodalComponent
  })
  .name;
