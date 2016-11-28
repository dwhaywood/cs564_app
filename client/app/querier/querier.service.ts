'use strict';
const angular = require('angular');

/*@ngInject*/
export function querierService($resource) {
	// AngularJS will instantiate a singleton by calling "new" on this function
    return $resource('/query/:name',{name: '@name'})
}

export default angular.module('cs564WebAppApp.querier', [])
  .service('querier', querierService)
  .name;
