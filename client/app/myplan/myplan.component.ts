'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
var moment = require('moment');

import routes from './myplan.routes';
import './myplan.css';

export class MyplanComponent {
    startDate;
    endDate;
    viewScheduleData;
    scheduledMeals;
    locationParams;
    Auth;
    currDate;
    ScheduledMeal;
    loaded;
    meals;
    $watchGroup;
    
    /*@ngInject*/
    constructor($location,Auth,ScheduledMeal,$watchGroup) {
        this.locationParams = $location.search();
        this.Auth = Auth
        this.currDate = new Date;
        this.ScheduledMeal = ScheduledMeal;
        this.viewScheduleData = {
            days: [],
            breakfast: [],
            lunch: [],
            dinner: []
        }
        this.meals = ['breakfast','lunch','dinner']; //Can add others if needed
        this.$watchGroup = $watchGroup;
    }
    //Retrieve scheduled meals for the user from server
    getScheduledMeals =  () => {
        return this.ScheduledMeal.query({UserId:1});
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
        this.buildViewData();
        this.$watchGroup(['startDate','endDate'],this.validateDates);
    }

    //Build the object based on the input paramters that will be rendered by the template
    buildViewData = () => {
        let daynames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        for(var day = new Date(this.startDate); day <= this.endDate; day.setDate(day.getDate()+1)){
            this.viewScheduleData['days'].push({date:day, dayname:daynames[day.getDay()],disp:moment(day).format('ddd MMM Do')})
            for (let meal of this.meals){
                this.viewScheduleData[meal].push({planned:false});
            }
            
        }
        console.log(this.viewScheduleData);
    }
    //Return the recipeid for the meal scheduled on that date
    //date: Date the meal is scheduled for
    //meal: ['breakfast','lunch','dinner']
    findScheduledRecipe = function(date,meal){
        
    }
    
    validateDates = (newvalue,oldvalue,scope) => {
        console.log('New value:'+newvalue);
    }
}

export default angular.module('cs564WebAppApp.myplan', [ngRoute])
  .config(routes)
  .component('myplan', {
    template: require('./myplan.html'),
    controller: MyplanComponent,
    controllerAs: 'myplanCtrl'
  })
  .name;
