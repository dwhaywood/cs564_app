'use strict';
const angular = require('angular');

export class LikeButtonComponent {
    liked;
    recipeid;
    isLoggedIn: Function;
    currentUser;
    $http;
    ready;
    _id
    /*@ngInject*/
    constructor(Auth,$http) {
    this.$http = $http;
    this.liked = false;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.currentUser = Auth.getCurrentUserSync();
    }
    $onInit = () => {
        this.$http.get('/api/preferences',{params:{UserId:this.currentUser._id, RecipeId: this.recipeid }}).then((res) => {
            var liked = res.data[0]
            
            if (liked) {
                this._id = liked._id;
                this.liked=true;
            } else {
                this.liked = false;
            }
            this.ready = true;
        },console.error);
        
        
    };
    likeThis(){
        this.liked = !this.liked;
        if (this.liked) {
            this.$http.post('/api/preferences',{UserId:this.currentUser._id, RecipeId: this.recipeid }).then((res) => {
                console.log(res)
                this._id = res.data._id;
            },console.error);
        } else {
            this.$http.delete('/api/preferences/'+this._id).then(console.log,console.error);
        }
        
    }
    getUserPref(recipeid,userid) {
        
    }
    setUserPref(recipeid,userid){
        
    }
}

export default angular.module('cs564WebAppApp.LikeButton', [])
  .component('likebutton', {
    template: '<button ng-show="$ctrl.isLoggedIn() && $ctrl.ready" type="submit" class="btn btn-info btn-sm" ng-click="$ctrl.likeThis()"><i class="fa" aria-hidden="true" ng-class="$ctrl.liked ? \'fa-heart\' : \'fa-heart-o\'"></i></button>',
    bindings: { liked: '<', recipeid: '<' },
    controller: LikeButtonComponent
  })
  .name;
