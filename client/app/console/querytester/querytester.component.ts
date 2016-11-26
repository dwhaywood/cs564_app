'use strict';
const angular = require('angular');

export class querytesterComponent {
  /*@ngInject*/
  constructor() {
    //this.message = 'World';
  }
}

export default angular.module('console.querytester', [])
  .component('querytester', {
    template: require('./querytester.html'),
    bindings: { message: '<' },
    controller: querytesterComponent
  })
  .name;
