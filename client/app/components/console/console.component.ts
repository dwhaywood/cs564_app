'use strict';
const angular = require('angular');

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
                this.queryColumns= Object.keys(this.queryResponse[0])
                
        });
    }
}

export default angular.module('cs564WebAppApp.console', [])
  .component('console', {
    template: require('./console.html'),
    controller: consoleComponent
  })
  .name;
