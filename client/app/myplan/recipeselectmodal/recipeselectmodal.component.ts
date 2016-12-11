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
    favsLoaded;
    suggestedLoaded;

    /*@ngInject*/
    constructor(Recipe,querier,$http) {
        this.Recipe = Recipe;
        this.querier = querier;
        this.$http = $http;
    }
    
    $onInit(){
        //Populate suggested and favorite tables
        this.favsLoaded = true;
        this.mealtime= this.resolve.meal;
        this.date= this.resolve.day;
        this.user= this.resolve.user;
        this.$http.get('/api/preferences',{
            params: {
                UserId: this.user
            }
        }).then((res)=>{
            //console.log(res.data);
            this.favoriteRecipes = res.data;
            this.loadAllFavRecipes();
        }).catch(console.error);
        
        this.querier.query({name: 'FindRecipesFromFriends', replacements:JSON.stringify({UserId: this.user})},(results) =>{
            console.log(results);
            this.suggestedRecipes = results[0];
        },console.error);
    }
    loadAllFavRecipes(){
        var allfavpromises = [];
        for (var fav of this.favoriteRecipes) {
            allfavpromises.push(this.Recipe.get({id:fav.RecipeId}))
        }
        Promise.all(allfavpromises).then((results)=>{
           for (var result of results) {
               this.favoriteRecipes[results.indexOf(result)].data = result;
           }
            this.favsLoaded = true;
        });
        
    }
    loadAllSuggestedRecipes(){
        var allfavpromises = [];
        /*for (var fav in this.suggestedRecipes) {
            if (this.suggestedRecipes.hasOwnProperty(fav)){
                 allfavpromises.push(this.Recipe.get({id:this.suggestedRecipes[fav].RecipeId}))
            }
           
        }*/
        for (var fav of this.suggestedRecipes) {
            allfavpromises.push(this.Recipe.get({id:fav.RecipeId}))
           
        }
        Promise.all(allfavpromises).then((results)=>{
           for (var result of results) {
               this.favoriteRecipes[results.indexOf(result)].data = result;
           }
            this.suggestedLoaded = true;
        });
        
    }
    selectRecipe(recipeid){
        this.favoriteRecipes;
    }
    add(recipeid) {
        this.close(({$value: recipeid}))
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
    bindings: { resolve: '<', recipeSelected: '&', close: '&', user: '<',
    dismiss: '&' },
    controller: recipeselectmodalComponent
  })
  .name;
