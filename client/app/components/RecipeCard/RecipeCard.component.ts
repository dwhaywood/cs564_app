'use strict';
const angular = require('angular');

export class RecipeCardComponent {
    title;
    image;
    liked;
    recipeid;

  /*@ngInject*/
  constructor() {
    this.title = this.title || 'No Title';
    this.image = this.image || 'http://placehold.it/700x400';
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
            <likebutton recipeid="$ctrl.recipeid"></likebutton>\
        </div> \
        </div> \
        ',
    bindings: { recipeid: '<', title: '<' },
    controller: RecipeCardComponent
  })
  .name;
