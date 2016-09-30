'use strict';
const angular = require('angular');

export function OauthButtonsController($window) {
  'ngInject';
  this.loginOauth = function(provider) {
    $window.location.href = '/auth/' + provider;
  };
}

export default angular.module('cs564WebAppApp.oauthButtons', [])
  .directive('oauthButtons', function() {
    return {
      template: require('./oauth-buttons.html'),
      restrict: 'EA',
      controller: OauthButtonsController,
      controllerAs: 'OauthButtons',
      scope: {
        classes: '@'
      }
    };
  })
  .name;
