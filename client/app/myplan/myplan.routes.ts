'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/myplan', {
      template: '<myplan></myplan>'
    });
}
