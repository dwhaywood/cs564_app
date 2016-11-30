'use strict';
const angular = require('angular');

export class recipecardminiComponent {
    title;
    image;
    recipeid;
    Recipe;
    onRemove;
    onRandom;
    onAdd;
    scheduledmeal;
    isScheduled;
    mealtime;
    date;
    recipedata;
  /*@ngInject*/
  constructor(Recipe) {
      this.Recipe = Recipe;
      this.isScheduled = false;
  }
    $onInit = function () {
        if (this.recipeid && !this.title ) {
            this.Recipe.get({_id:this.recipeid},this.loadRecipeData)
        }
        this.image = this.image || this.recipedata.imageAddress || 'http://placehold.it/200x150';
        this.title = this.title || this.recipedata.recipeName|| 'No recipe'
    }
    $onChanges = (changes) => {
        console.log(changes);
        for (let change in changes){
            switch (change){
                case 'recipedata':
                    this.updateView(changes[change].currentValue);
                    break;
                default:
            }
                    
        }
    }
    loadRecipeData = (result) => {
        console.log(result);
    }
    updateView = (recipedata) => {
        this.setImage(recipedata.imageAddress);
        this.setTitle(recipedata.recipeName);
        if (recipedata._id) {
            this.isScheduled=true;
        } else {
            this.isScheduled=false;
        }
    }
    setTitle(newtitle){
        this.title = newtitle || 'No recipe'
    }
    setImage(newimage){
        this.image = newimage || 'http://placehold.it/200x150';
    }
    remove = () => {
        this.onRemove({meal: this.scheduledmeal});
    }
    
    random = () => {
        this.onRandom({meal: this.mealtime, day: this.date});
    }
    add = () => {
        this.onAdd({meal: this.mealtime, day: this.date});
    }
}

export default angular.module('cs564WebAppApp.recipecardmini', [])
  .component('recipecardmini', {
    template: require('./recipecardmini.html'),
    bindings: { mealtime: '<', date: '<', title: '<', recipeid: '<', scheduledmeal: '<',recipedata: '<', onRemove: '&', onRandom: '&', onAdd: '&' },
    controller: recipecardminiComponent
  })
  .name;
