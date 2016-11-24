'use strict';
/*eslint-env node*/
var testsContext;

require('babel-polyfill');
var angular = require('angular');
require('angular-mocks');



testsContext = require.context('./client', true, /\.spec\.ts$/);
testsContext.keys().forEach(testsContext);
