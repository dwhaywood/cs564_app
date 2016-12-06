'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/recipe/:id', {
      template: '<recipe id="id"></recipe>',
    });
}
