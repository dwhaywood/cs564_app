'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/plan', {
      template: '<plan></plan>'
    });
}
