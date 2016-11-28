'use strict';
const angular = require('angular');
// import ngAnimate from 'angular-animate';
const ngCookies = require('angular-cookies');
const ngResource = require('angular-resource');
const ngSanitize = require('angular-sanitize');

const ngRoute = require('angular-route');

const uiBootstrap = require('angular-ui-bootstrap');
//const ngMessages = require('angular-messages');
// import ngValidationMatch from 'angular-validation-match';


import {routeConfig} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import console from './console/console.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import favs from './favs/favs.component';
import mylist from './mylist/mylist.component';
import myplan from './myplan/myplan.component';
import plan from './plan/plan.component';
import recipe from './recipe/recipe.component';
import search from './search/search.component';
import recipecard from './components/RecipeCard/RecipeCard.component';
import likebutton from './components/LikeButton/LikeButton.component';
import recipecardmini from './components/recipecardmini/recipecardmini.component';
import querier from './querier/querier.service';
import Recipe from './recipe/Recipe.service';
import ScheduledMeal from './ScheduledMeal/ScheduledMeal.service';
//import search from './search/search.component';



import './app.css';

angular.module('cs564WebAppApp', [
  ngCookies,
  ngResource,
  ngSanitize,


  ngRoute,
  uiBootstrap,

  _Auth,
  account,
  admin,  navbar,
  footer,
  main,
  constants,

  util,
  console,
    favs,
    mylist,
    myplan,
    plan,
    recipe,
    search,
    recipecard,
    likebutton,
    recipecardmini,
    querier,
    Recipe,
    ScheduledMeal
    //ngMessages
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
angular.module('cs564WebAppApp').filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['cs564WebAppApp'], {
      strictDi: true
    });
  });


