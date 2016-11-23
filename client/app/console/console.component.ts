'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './console.routes';

export class consoleComponent {
    $http;
    queryString;
    queryResponse;
    queryColumns;

    /*@ngInject*/
    constructor($http) {
        this.queryString='Select * from users';
        this.$http = $http;
        this.queryColumns=[];
        this.queryResponse=[];
    }
    runQuery() {
            this.$http.get('/api/query',{params:{'sql':this.queryString}}).then(response => {
                this.queryResponse = response.data[0];
                this.queryColumns= this.queryResponse[0].keys;
                
        });
    }
}

export default angular.module('cs564WebAppApp.console', [ngRoute])
  .config(routes)
  .component('console', {
    template: require('./console.html'),
    controller: ConsoleComponent,
    controllerAs: 'consoleCtrl'
  })
  .name;
