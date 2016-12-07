'use strict';
const angular = require('angular');

export class RecipeCardComponent {
    description;
    title;
    image;
    liked;
    recipeid;
    Recipe;
    $uibModal
    
    
    /*@ngInject*/
    constructor(Recipe,$uibModal) {
        this.$uibModal = $uibModal;
        this.Recipe = Recipe;
        this.title = this.title || 'No Title';
        //this.description = this.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.';
        this.image = this.image || 'http://placehold.it/700x400';
    }
    
    $onInit = () => {
        this.Recipe.get({id:this.recipeid}, (recipe) => {
            if (recipe) {
                this.title = recipe.recipeName;
                this.image = recipe.imageAddress;
                
            }
            
        });
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
export default angular.module('cs564WebAppApp.RecipeCard', [])
  .component('recipecard', {
    template: '\
        <div class="col-md-4 recipe-item"> \
            <a href="#"> \
                <img class="img-responsive" src="{{$ctrl.image}}" alt=""> \
            </a> \
        <div class="title"> \
            <h3>\
              <a ng-click="$ctrl.recipeDetail($ctrl.recipeid)">{{ $ctrl.title }}</a> \
            </h3> \
            <likebutton recipeid="$ctrl.recipeid"></likebutton>\
        </div> \
            <p>{{$ctrl.description}}</p> \
        </div> \
        ',
    bindings: { recipeid: '<', title: '<' },
    controller: RecipeCardComponent
  })
  .name;
