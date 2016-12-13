'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './user.routes';

export class UserComponent {
    myFriendsLoaded
    myFriendsLoading
    myFriends
    futureFriendsLoaded
    futureFriends
    resultsFilter
    favsLoaded
    favoriteRecipes
    $http
    querier
    Recipe
    currentUser
    User
    $scope
    
    /*@ngInject*/
    constructor($http,querier,Recipe,Auth,User,$scope) {
        this.$http = $http;
        this.querier = querier;
        this.Recipe = Recipe;
        this.currentUser = Auth.getCurrentUserSync();
        this.User = User;
        this.$scope = $scope
    }
    $onInit(){
        
        this.currentUser.$promise.then(()=>{
            //Load favorite recipes
            this.$http.get('/api/preferences',{
                    params: {
                        UserId: this.currentUser._id
                    }
                }).then((res)=>{
                    //console.log(res.data);
                    this.favoriteRecipes = res.data;
                    this.loadAllFavRecipes();
                }).catch(console.error);
            
            //Load suggested friends
            this.querier.query({name: 'FindFriends', replacements:JSON.stringify({UserId: this.currentUser._id})},(results) =>{
                    console.log(results);
                    this.futureFriends = results[0];
                    this.loadAllFuturefriends()
                },console.error);
            //load current friends
            this.$http.get('/api/users/'+this.currentUser._id+'/friends').then((res)=>{
                    //console.log(res.data);
                    this.myFriends = res.data;
                    this.loadAllMyFriends();
                }).catch(console.error);
        
        });
        
    }
    removeFriend(friendid){
        this.myFriendsLoaded = false;
        this.$http.delete('/api/users/'+this.currentUser._id+'/friends?FriendId='+friendid).then(()=>{
            console.log('Friend removed');
            this.reloadFriends();
        })
        
    }
    reloadFriends(){
        if(!this.myFriendsLoading){
            
        this.myFriendsLoading=true;
        this.$http.get('/api/users/'+this.currentUser._id+'/friends',{cache: false}).then((res)=>{
                    //console.log(res.data);
                    this.myFriends = res.data;
                    this.loadAllMyFriends();
                }).catch(console.error);
         }
    }
    addFriend(friendid){
        this.myFriendsLoaded = false;
        this.$http.post('/api/users/'+this.currentUser._id+'/friends', {FriendId:friendid}).then(()=>{
            console.log('Friend Added');
            this.reloadFriends();
            this.reloadSuggestedFriends();
        })
    }
    loadMyFriends(){
        
    }
    reloadSuggestedFriends(){
         //Load suggested friends
            this.querier.query({name: 'FindFriends', replacements:JSON.stringify({UserId: this.currentUser._id})},(results) =>{
                    console.log(results);
                    this.futureFriends = results[0];
                    this.loadAllFuturefriends()
                },console.error);
    }
    
    loadAllFavRecipes=()=>{
        var allfavpromises = [];
        for (var fav of this.favoriteRecipes) {
            allfavpromises.push(this.Recipe.get({id:fav.RecipeId}));
        }
        Promise.all(allfavpromises).then((results)=>{
           for (var result of results) {
               this.favoriteRecipes[results.indexOf(result)].data = result;
           }
            this.favsLoaded = true;
        });
        
    }
    loadAllFuturefriends=()=>{
        var allfuturepromises = [];
        //for (var friend; friend < this.futureFriends.length; friend++) {
        for (var friend in  this.futureFriends) {
            if ( this.futureFriends.hasOwnProperty(friend)){
                this.futureFriends[friend].data = {}; 
                this.futureFriends[friend].image = 'http://placehold.it/200x200?text=No+image';
                allfuturepromises.push(this.User.getinfo({userid:this.futureFriends[friend].UserId}));
            }
           
            
        }
        Promise.all(allfuturepromises).then((results)=>{
           for (var result of results) {
               this.futureFriends[results.indexOf(result)].data = result;
           }
            this.futureFriendsLoaded = true;
        });
        var allfuturefriendimages = [];
        for (var friend in  this.futureFriends) {
            if ( this.futureFriends.hasOwnProperty(friend)){
            allfuturefriendimages.push(this.$http.get('https://randomuser.me/api/?inc=picture&seed='+this.futureFriends[friend].UserId,{cache: true, headers: {'Access-Control-Allow-Origin': '*'}}))
            }
        }
        Promise.all(allfuturefriendimages).then((results)=>{
            var i = 0;
           for (var result of results) {
               this.futureFriends[i].image = result.data.results[0].picture.large;
               i++;
           }
            this.$scope.$apply();
        });
    }
    loadAllMyFriends=()=>{
        var allfriendspromises = [];
        for (var friend of this.myFriends) {
           this.myFriends[this.myFriends.indexOf(friend)].data = {};
           this.myFriends[this.myFriends.indexOf(friend)].data.picture = {}; allfriendspromises.push(this.User.getinfo({userid:friend.FriendId}));
        }
        Promise.all(allfriendspromises).then((results)=>{
           for (var result of results) {
               this.myFriends[results.indexOf(result)].data = result;
           }
            this.myFriendsLoaded = true;
            this.myFriendsLoading = false;
            
        });
        var allmyfriendimages = [];
        for (var fav of this.myFriends) {
            allmyfriendimages.push(this.$http.get('https://randomuser.me/api/?inc=picture&seed='+fav.FriendId,{cache: true, headers: {'Access-Control-Allow-Origin': '*'}}))
            
        }
        Promise.all(allmyfriendimages).then((results)=>{
            var i = 0;
           for (var result of results) {
               this.myFriends[i].image = result.data.results[0].picture.large;
               i++;
           }
            this.$scope.$apply();
        });
    }
}

export default angular.module('cs564WebAppApp.user', [ngRoute])
  .config(routes)
  .component('user', {
    template: require('./user.html'),
    controller: UserComponent,
    controllerAs: 'userCtrl'
  })
  .name;
