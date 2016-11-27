'use strict';
const angular = require('angular');

export class LikeButtonComponent {
    liked;
    recipeid;
    isLoggedIn: Function;
    getCurrentUser: Function;
    $http;
    /*@ngInject*/
    constructor(Auth,$http) {
    this.$http = $http;
    this.liked = false;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    }
    likeThis(){
        this.liked = !this.liked;
        console.log(this.getCurrentUser());
    }
    getUserPref(recipeid,userid) {
        
    }
    setUserPref(recipeid,userid){
        
    }
}

export default angular.module('cs564WebAppApp.LikeButton', [])
  .component('likebutton', {
    template: '<button ng-show="$ctrl.isLoggedIn()" type="submit" class="btn btn-info btn-sm" ng-click="$ctrl.likeThis()"><i class="fa" aria-hidden="true" ng-class="$ctrl.liked ? \'fa-heart\' : \'fa-heart-o\'"></i></button>',
    bindings: { liked: '<' },
    controller: LikeButtonComponent
  })
  .name;
