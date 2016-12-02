'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/user', {
      template: '<user></user>'
    });
}
