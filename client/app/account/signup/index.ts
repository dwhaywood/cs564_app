'use strict';
const angular = require('angular');
import SignupController from './signup.controller';

export default angular.module('cs564WebAppApp.signup', [])
    .controller('SignupController', SignupController)
    .name;
