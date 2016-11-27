'use strict';
const angular = require('angular');

export class LikeButtonComponent {
    liked;
    recipeid
  /*@ngInject*/
  constructor() {
    this.liked = false;
  }
}

export default angular.module('cs564WebAppApp.LikeButton', [])
  .component('likebutton', {
    template: '<button type="submit" class="btn btn-info btn-sm"><span class="glyphicon glyphicon-heart"></span></button>',
    bindings: { liked: '<' },
    controller: LikeButtonComponent
  })
  .name;
