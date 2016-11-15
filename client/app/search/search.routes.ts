'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/search', {
      template: '<search></search>'
    });
}
