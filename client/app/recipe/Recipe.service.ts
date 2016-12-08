'use strict';
const angular = require('angular');

/*@ngInject*/
export function RecipeService($resource) {
  // Service logic
  // ...

  var meaningOfLife = 42;

  // Public API here
  return $resource('/api/recipes/:id',{id: '@_id'},{
      random: {method: 'GET', url: '/api/recipes/random'},
      get: {method: 'GET', cache: true}
  });
}


export default angular.module('cs564WebAppApp.Recipe', [])
  .factory('Recipe', RecipeService)
  .name;
