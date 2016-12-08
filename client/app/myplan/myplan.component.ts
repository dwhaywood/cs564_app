'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
var moment = require('moment');
var _ = require('lodash');

import routes from './myplan.routes';
import './myplan.css';
import RecipeSelectModal from './recipeselectmodal/recipeselectmodal.component'

export class MyplanComponent {
    startDate;
    endDate;
    viewScheduleData;
    scheduledMeals;
    locationParams;
    Auth;
    currDate;
    ScheduledMeal; //ScheduledMeal resource
    loaded;
    meals;
    Recipe; //Recipe resource
    $scope;
    $uibModal
    currentUser
    
    /*@ngInject*/
    constructor($location,Auth,ScheduledMeal,$scope,Recipe,$uibModal) {
        this.locationParams = $location.search();
        this.Auth = Auth
        this.currDate = new Date;
        this.ScheduledMeal = ScheduledMeal;
        this.Recipe = Recipe;
        this.viewScheduleData = {
            days: [],
            breakfast: [],
            lunch: [],
            dinner: []
        }
        this.meals = ['breakfast','lunch','dinner']; //Can add others if needed
        this.$scope = $scope;
        this.$uibModal=$uibModal;
        //this.$scope.$watchGroup(() => [this.startDate,this.endDate],this.validateDates);
        this.$scope.$watch(() => this.startDate,()=>{
           console.log('Start Date: ' + this.startDate.toString());
            this.validateAndUpdateDates();
        });
        this.$scope.$watch(() => this.endDate,()=>{
           console.log('End Date: ' + this.endDate.toString());
            this.validateAndUpdateDates();
        });
        this.currentUser = this.Auth.getCurrentUserSync();
    }
    //Retrieve scheduled meals for the user from server
    getScheduledMeals =  () => {
        return this.ScheduledMeal.scheduled({UserId:this.currentUser, startDate: this.startDate, endDate: this.endDate});
    }
    //Initialization
    $onInit = () => {
        //this.startDate = new Date(this.locationParams.s) || this.currDate.getDate() - this.currDate.getDay(); //Defaultvto start of current week
        this.startDate = new Date(this.currDate.setDate(this.currDate.getDate() - this.currDate.getDay())); //Defaultvto start of current week
        //this.endDate = new Date(this.locationParams.e) || this.startDate + 6; //Defaultvto start of current week
        this.endDate = new Date(this.currDate.setDate(this.startDate.getDate()+6)); //Defaultvto start of current week
        this.getScheduledMeals().$promise.then((res) => {
            this.scheduledMeals = res;
            this.loaded = true;
        })
        //this.buildViewData();
        
    }

    //Build the object based on the input paramters that will be rendered by the template
    buildViewData = () => {
        this.viewScheduleData = {
            days: [],
            breakfast: [],
            lunch: [],
            dinner: []
        }
        let daynames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        for(var day = new Date(this.startDate); day <= this.endDate; day.setDate(day.getDate()+1)){
            this.viewScheduleData['days'].push({date:day.toISOString(), dayname:daynames[day.getDay()],disp:moment(day).format('ddd M/D')})
            
            for (let meal of this.meals){
                this.viewScheduleData[meal].push({date:day.toISOString(), planned:false,mealid:'',recipedata: {}});
            }
            
        }
        console.log(this.viewScheduleData);
    }
    //Return the recipeid for the meal scheduled on that date
    //date: Date the meal is scheduled for
    //meal: ['breakfast','lunch','dinner']
    findScheduledRecipe = function(date,meal){
        
    }
    
    validateAndUpdateDates = () => {
            let valid = this.validateDates();
        
            if (valid) {
                this.getScheduledMeals().$promise.then((res) => {
                    console.log(res);
                    this.scheduledMeals = res;
                    this.loaded = true;
                    this.buildViewData();
                })
                
            }
            
        
    }
    validateDates = () => {
        return true;
    }
    
    //Callback when a meal is deleted    
    removeMeal = (meal) => {
        this.ScheduledMeal.delete({_id: meal._id}).then(()=>{
            //Rebuild all of the view data
            this.buildViewData
            //Maybe just update the place where the meal came from?
            
        }).catch((error) => {
            console.log(error);
        })
        
        
    }
    
    randomMeal = (day, meal) => {
        console.log('Random recipe for '+meal+' on '+day.toString());
        var recipe = 
            this.Recipe.random({meal:meal,day:day}, ()=>{
                
                console.log(recipe)
                this.ScheduledMeal.post({date:day,UserId:this.currentUser, timeOfDay: meal,RecipeId: recipe._id},()=>{console.log('Scheduled Recipe!')})
                this.viewScheduleData[meal][_.findIndex(this.viewScheduleData[meal],{date:day})].recipedata = recipe;
                
            });

    }
    
    //Launch modal
    items = ['item1', 'item2', 'item3'];
    addRecipe(day,meal) {
        
        var modalInstance = this.$uibModal.open({
          animation: true,
          component: 'recipeselectmodal',
          size: 'lg',
          resolve: {
            day: function () {
              return new Date(day);
                },
            meal: function () {
                return meal;
                }
            }
          });

        modalInstance.result.then(function (selectedItem) {
          this.selected = selectedItem;
        }, function () {
          console.log('modal-component dismissed at: ' + new Date());
        });
    }
    
    //Functions for date controllers
    clear = () => {
        this.startDate = null;
        this.endDate = null;
    };

    dateOptions = {
        dateDisabled: this.disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 0
    };

    // Disable weekend selection
    disabled = (data) => {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    open1 = function() {
    this.popup1.opened = true;
    };

    open2 = function() {
    this.popup2.opened = true;
    };

    setDate = function(year, month, day) {
    this.dt = new Date(year, month, day);
    };

    formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    format = this.formats[3];
    altInputFormats = ['M!/d!/yyyy'];

    popup1 = {
    opened: false
    };

    popup2 = {
    opened: false
    };

    /*
    getDayClass = (data) => {
        var date = data.date,
        mode = data.mode;
        if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i = 0; i < this.events.length; i++) {
            var currentDay = new Date(this.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
              return this.events[i].status;
            }
      }
    }
        inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };
    }*/
    
}

export default angular.module('cs564WebAppApp.myplan', [ngRoute,RecipeSelectModal])
  .config(routes)
  .component('myplan', {
    template: require('./myplan.html'),
    controller: MyplanComponent,
    controllerAs: 'myplanCtrl'
  })
  .name;
