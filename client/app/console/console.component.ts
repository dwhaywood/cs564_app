'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './console.routes';
import queryParam from './querytestparam/querytestparam.component';

export class ConsoleComponent {
    $http;
    queryString;
    queryResponse;
    queryColumns;
    queryUrl;
    queryParams;
    replacements;
    ctrl;

    /*@ngInject*/
    constructor($http) {
        this.queryString='Select * from :table limit 100';
        this.$http = $http;
        this.queryColumns=[];
        this.queryResponse=[];
        this.queryParams = [{key:'table',
                            value: '?'}];
        this.replacements= {};
        this.ctrl = this;
    }
    runQuery() {
        this.getParams();
        if(this.queryUrl) {
            this.$http.get('/api/'+this.queryUrl,{params:{ replacements:this.replacements}}).then((response)=>{
                this.queryResponse = response.data[0];
                this.queryColumns= (<any>Object).keys(this.queryResponse[0]);
            }
            
            );
        }
        else {
            this.$http.get('/api/query',{params:{'sql':this.queryString, replacements:this.replacements}}).then((response)=>{
                this.queryResponse = response.data[0];
                this.queryColumns= (<any>Object).keys(this.queryResponse[0]);
            }
            );
        }
            
    };
    
    getParams() {
        this.queryParams.forEach(function(param,index) {
            this.replacements[param.key]=param.value
        },this);
    }
    
    populateTable(response){
        this.queryResponse = response.data[0];
        this.queryColumns= (<any>Object).keys(this.queryResponse[0]);
    }
    
    addnewParam(){
        this.queryParams.push({key:'',value:''});
        console.log(this.queryParams);
    }
    
    
}

export default angular.module('cs564WebAppApp.console', [ngRoute,queryParam])
  .config(routes)
  .component('console', {
    template: require('./console.html'),
    controller: ConsoleComponent,
    controllerAs: 'consoleCtrl'
  })
  .name;
