'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/', {
      template: '<main></main>'
    }).when('/console', {
      template: '<console></console>'
    });;
};

