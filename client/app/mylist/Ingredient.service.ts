'use strict';
const angular = require('angular');

/*@ngInject*/
export function IngredientService($resource) {
  return $resource('/api/ingredients/:id',{id:'@_id'},{
      scheduled: {method:'GET', url: '/api/query/GetShoppingListByDates',isArray:true},
      delete: {method:'DELETE', url: '/api/scheduled-meals/:id'}
  });
};



export default angular.module('cs564WebAppApp.Ingredient', [])
  .factory('Ingredient', IngredientService)
  .name;
