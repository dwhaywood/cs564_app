'use strict';
const angular = require('angular');

export class RecipeCardComponent {
    description;
    title;
    image;
    liked;
    recipeid;
    
  /*@ngInject*/
  constructor() {
    this.title = 'Recipe Title';
    this.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.';
    this.image = 'http://placehold.it/700x400';
  }
}

export default angular.module('yes', [])
  .component('recipecard', {
    template: '\
        <div class="col-md-4 recipe-item"> \
            <a href="#"> \
                <img class="img-responsive" src="{{$ctrl.image}}" alt=""> \
            </a> \
        <div class="title"> \
            <h3>\
              <a href="#">{{ $ctrl.title }}</a> \
            </h3> \
            <likebutton></likebutton>\
        </div> \
            <p>{{$ctrl.description}}</p> \
        </div> \
        ',
    bindings: { recipeId: '<' },
    controller: RecipeCardComponent
  })
  .name;
