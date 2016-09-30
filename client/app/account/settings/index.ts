'use strict';
const angular = require('angular');
import SettingsController from './settings.controller';

export default angular.module('cs564WebAppApp.settings', [])
  .controller('SettingsController', SettingsController)
  .name;
