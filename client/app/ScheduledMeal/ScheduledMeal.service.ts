'use strict';
const angular = require('angular');

/*@ngInject*/
export function ScheduledMealService($resource) {
  return $resource('/api/scheduled-meals/:id',{id:'@_id'});
};



export default angular.module('cs564WebAppApp.ScheduledMeal', [])
  .factory('ScheduledMeal', ScheduledMealService)
  .name;
