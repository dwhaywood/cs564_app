'use strict';
const angular = require('angular');

/*@ngInject*/
export function RecipeService($resource) {
  // Service logic
  // ...

  var meaningOfLife = 42;

  // Public API here
  return $resource('/api/recipe/:id',{id: '@_id'});
}


export default angular.module('cs564WebAppApp.Recipe', [])
  .factory('Recipe', RecipeService)
  .name;
