'use strict';
const angular = require('angular');

export class ScheduleViewComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'World';
  }
}

export default angular.module('cs564WebAppApp.ScheduleView', [])
  .component('ScheduleView', {
    template: '<h1>Hello {{ $ctrl.message }}</h1>',
    bindings: { message: '<' },
    controller: ScheduleViewComponent
  })
  .name;
