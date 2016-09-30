'use strict';
const angular = require('angular');
import routes from './admin.routes';
import AdminController from './admin.controller';

export default angular.module('cs564WebAppApp.admin', [
  'cs564WebAppApp.auth',
  'ngRoute'
])
  .config(routes)
  .controller('AdminController', AdminController)
  .name;
