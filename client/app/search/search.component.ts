'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
const _ = require('lodash');

import routes from './search.routes';
import './search.css';

export class SearchComponent {
    results;
    message;
    currentPage;
    totalItems;
    searchTerm;
    itemsPerPage;
    querier;
  /*@ngInject*/
  constructor(querier) {
    this.message = 'Hello';
    this.results=[];/*
    for (var i=0; i <100; i++){ //Generate 100 fake recipes for testing
        this.results.push({
            _id:i,
            title: 'Recipe #'+i
        })
    }*/
    this.currentPage = 1;
    this.totalItems = this.results.length;
    this.itemsPerPage = 9;
    this.querier = querier;
   }
    $onInit() {
        //
    }
    search = () => {
        this.querier.query({name:'FindRecipeByName', replacements: { keyWord: this.searchTerm}},(res)=>{
            this.results = (<any>Object).keys(res[0]).map(key => res[0][key]);
            //console.log(this.results);
            this.totalItems = this.results.length;
        },console.error)
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
