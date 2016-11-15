'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/recipe', {
      template: '<recipe></recipe>'
    });
}
