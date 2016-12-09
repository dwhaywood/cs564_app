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
    $http;
    user;

    /*@ngInject*/
    constructor(Recipe,querier,$http) {
        this.Recipe = Recipe;
        this.querier = querier;
        this.$http = $http;
    }
    
    $onInit(){
        //Populate suggested and favorite tables
        this.mealtime= this.resolve.meal;
        this.date= this.resolve.day;
        this.user= this.resolve.user;
        this.$http.get('/api/preferences',{
            params: {
                _id: this.user
            }
        }).then((res)=>{
            this.favoriteRecipes = res[0];
        });
        
        this.querier.query({name: 'GetUserFavoriteRecipes', replacements:JSON.stringify({UserId: this.user})},(results) =>{
            console.log(results);
            this.suggestedRecipes = results[0];
        });
    }
    
    selectRecipe(recipeid){
        this.favoriteRecipes;
    }
    add(recipeid) {
        this.close
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
    bindings: { resolve: '<', recipeSelected: '&', close: '&', user: '<'
    dismiss: '&' },
    controller: recipeselectmodalComponent
  })
  .name;
