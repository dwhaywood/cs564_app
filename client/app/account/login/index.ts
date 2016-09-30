'use strict';
const angular = require('angular');
import LoginController from './login.controller';

export default angular.module('cs564WebAppApp.login', [])
  .controller('LoginController', LoginController)
  .name;
