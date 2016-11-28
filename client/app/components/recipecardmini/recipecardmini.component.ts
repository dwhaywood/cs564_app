'use strict';
const angular = require('angular');

export class recipecardminiComponent {
    title;
    image;
    recipeid;
  /*@ngInject*/
  constructor() {
  }
    $onInit = function () {
        this.image = 'http://placehold.it/200x150';
        this.title = this.title || 'No title'
    }
    removeRecipe() {
        
    }
}

export default angular.module('cs564WebAppApp.recipecardmini', [])
  .component('recipecardmini', {
    template: require('./recipecardmini.html'),
    bindings: { title: '<', recipeid: '<' },
    controller: recipecardminiComponent
  })
  .name;
