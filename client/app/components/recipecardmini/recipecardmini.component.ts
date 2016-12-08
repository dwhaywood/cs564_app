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
    mealid;
    isScheduled;
    mealtime;
    date;
    recipedata;
    loaded;
    $uibModal;
  /*@ngInject*/
  constructor(Recipe,$uibModal) {
      this.$uibModal = $uibModal;
      this.Recipe = Recipe;
      this.isScheduled = false;
  }
    $onInit = function () {
        if (this.recipeid && !this.loaded) {
            console.log("Get recipe on init: "); console.log(this.recipeid)
            this.Recipe.get({id:this.recipeid},this.loadRecipeData,console.error)
        }
        this.image = this.image || this.recipedata.imageAddress || 'http://placehold.it/200x150';
        this.title = this.title || this.recipedata.recipeName|| 'No recipe'
    }
    $onChanges = (changes) => {
        this.loaded = false;
        //console.log(changes);
        for (let change in changes){
            switch (change){
                case 'recipedata':
                    this.updateView(changes[change].currentValue);
                    break;
                case 'recipeid':
                    if (this.recipeid) {
                        console.log("Get recipe on changes: "); console.log(this.recipeid); this.Recipe.get({id:changes[change].currentValue},this.loadRecipeData,console.error);
                    }
                    break;
                default:
            }
                    
        }
    }
    loadRecipeData = (result) => {
        //console.log(result);
        this.updateView(result);
    }
    updateView = (recipedata) => {
        if (recipedata) {
            this.setImage(recipedata.imageAddress);
            this.setTitle(recipedata.recipeName);
            if (recipedata._id) {
                this.isScheduled=true;
            } else {
                this.isScheduled=false;
            }
            this.loaded=true;
        }
        
    }
    setTitle(newtitle){
        this.title = newtitle || 'No recipe'
    }
    setImage(newimage){
        this.image = newimage || 'http://placehold.it/200x150';
    }
    remove = () => {
        this.onRemove({meal: this.mealid});
    }
    
    random = () => {
        this.onRandom({meal: this.mealtime, day: this.date});
    }
    add = () => {
        this.onAdd({meal: this.mealtime, day: this.date});
    }
    
    recipeDetail = (recipeid) => {
        
        var modalInstance = this.$uibModal.open({
          animation: true,
          size: 'lg',
            component: 'recipe',
          //template: '<br/><recipe id="$ctrl.recipeid" ></recipe>',
            resolve: {id: function (){return recipeid;}}
        });
    
    }
}

export default angular.module('cs564WebAppApp.recipecardmini', [])
  .component('recipecardmini', {
    template: require('./recipecardmini.html'),
    bindings: { mealtime: '<', date: '<', title: '<', recipeid: '<', mealid: '<',recipedata: '<', onRemove: '&', onRandom: '&', onAdd: '&' },
    controller: recipecardminiComponent
  })
  .name;
