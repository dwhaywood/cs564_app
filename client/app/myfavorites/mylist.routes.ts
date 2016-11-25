'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/myfavorites', {
      template: '<myfavorites></myfavorites>'
    });
}
