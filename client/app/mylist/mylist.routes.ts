'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/mylist', {
      template: '<mylist></mylist>',
      authenticate: 'user'
    });
}
