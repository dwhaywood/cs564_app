'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './search.routes';
import './search.css';

export class SearchComponent {
    results;
    message;
    currentPage;
    totalItems;
    searchTerm;
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
    for (var i=0; i <100; i++){ //Generate 100 fake recipes for testing
        this.results.push({
            _id:i,
            title: 'Recipe #'+i
        })
    }
    this.currentPage = 1;
    this.totalItems = this.results.length;
   }
    $onInit() {
        //
    }
}

export default angular.module('cs564WebAppApp.search', [ngRoute])
  .config(routes)
  .component('search', {
    template: require('./search.html'),
    controller: SearchComponent,
    controllerAs: 'searchCtrl'
  })
  .name;
