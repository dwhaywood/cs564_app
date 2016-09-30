'use strict';
const angular = require('angular');
import {UtilService} from './util.service';

export default angular.module('cs564WebAppApp.util', [])
  .factory('Util', UtilService)
  .name;
