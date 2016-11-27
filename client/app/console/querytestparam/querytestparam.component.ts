'use strict';
const angular = require('angular');

export class querytestparamComponent {
    key;
    value;
    prop;
    /*@ngInject*/
    constructor() {

    }
    
    getKeyValue = function () {
          var obj = {};
          if (this.key && this.value) {
              obj[this.key] = this.value;
          }
          return obj
      }
    $onInit = function () {
        
    }
}

export default angular.module('console.querytestparam', [])
  .component('querytestparam', {
    template: '<input type="text" ng-model="$ctrl.prop.key"></input>:<input type="text" ng-model="$ctrl.prop.value"></input><br/>',
    bindings: { prop: '=', getKeyValue:'&' },
    controller: querytestparamComponent
  })
  .name;
