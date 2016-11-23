'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/console', {
      template: '<console></console>'
    });
}
