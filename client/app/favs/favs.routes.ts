'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/favs', {
      template: '<favs></favs>'
    });
}
