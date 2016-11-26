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
        if (this.prop){
            this.key = (<any>Object).keys(this.prop)[0];
            this.value = this.prop[this.key];
        }
        
    }
}

export default angular.module('console.querytestparam', [])
  .component('querytestparam', {
    template: '<input type="text" ng-model="$ctrl.key"></input>:<input type="text" ng-model="$ctrl.value"></input><br/>',
    bindings: { prop: '<', getKeyValue:'&' },
    controller: querytestparamComponent
  })
  .name;
