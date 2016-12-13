'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './mylist.routes';
import './mylist.css';

export class MylistComponent {
startDate;
    endDate;
    viewScheduleData;
    scheduledIngredients;
    locationParams;
    Auth;
    currDate;
    Ingredient; //Ingredient resource
    loaded;
    meals;
    Recipe; //Recipe resource
    $scope;
    $uibModal;
    currentUser;
    querier;
    
    /*@ngInject*/
    constructor($location,Auth,Ingredient,$scope,Recipe,$uibModal,querier) {
        this.locationParams = $location.search();
        this.Auth = Auth;
        this.querier = querier;
        var today = new Date();
        this.currDate = new Date(today.toDateString());
        this.Ingredient = Ingredient;
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
        this.currentUser = Auth.getCurrentUserSync();
        console.log('Current User: '); console.log( this.currentUser); //console.log(this.currentUser._id);
        //this.currentUser().then((res)=>{console.log(res)});
    }
    //Retrieve scheduled meals for the user from server
    getIngredients =  () => {
        //console.log(this.currentUser);
        this.currentUser.$promise.then(()=>{
            this.Ingredient.scheduled({replacements:JSON.stringify({UserId:this.currentUser._id, startDate: this.startDate, endDate: this.endDate})}).$promise.then(this.loadScheduledData);
        })
        
    }
    //Initialization
    $onInit = () => {
        //this.startDate = new Date(this.locationParams.s) || this.currDate.getDate() - this.currDate.getDay(); //Defaultvto start of current week
        this.startDate = new Date(this.currDate.setDate(this.currDate.getDate() - this.currDate.getDay())); //Defaultvto start of current week
        //this.endDate = new Date(this.locationParams.e) || this.startDate + 6; //Defaultvto start of current week
        this.endDate = new Date(this.currDate.setDate(this.startDate.getDate()+6)); //Defaultvto start of current week
        //this.getIngredients()
        //this.buildViewData();
        
    }
    loadScheduledData = (res) =>{
        this.scheduledIngredients = formatIngredients(res[0]);
        console.log(this.scheduledIngredients)
        this.loaded = true;
        //this.buildViewData();
        
        function formatIngredients(result) {
            var out = [];
            for (var key in result) {
                if (result.hasOwnProperty(key)) {
                    out.push(result[key]);
                }
            }
            return out;
        }
    }
    

    //
    validateAndUpdateDates = () => {
            let valid = this.validateDates();
        
            if (valid) {
                this.getIngredients();
                
            }
    }
    validateDates = () => {
        return true;
    }
    
    //Callback when a ingredient is deleted    
    removeIngredient = (index) => {
        console.log("To be deleted:"); console.log(index)
        this.scheduledIngredients.splice(index,1);
        
/*        this.Ingredient.delete({id: scheduledingredient.scheduledingredient._id},()=>{
            //Rebuild all of the view data
            this.getIngredients();
            //Maybe just update the place where the ingredient came from?
            
        },(error) => {
            console.log(error);
        })
        */
        
    }
   
    getIngredient(date,mealTime){
        
        if (!(date instanceof Date)) {
            date = new Date(date)
        }
        
        return _.get(this.scheduledIngredients,[date.toDateString(),mealTime]);
    }
    //Launch modal
    //items = ['item1', 'item2', 'item3'];
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

}

export default angular.module('cs564WebAppApp.mylist', [ngRoute])
  .config(routes)
  .component('mylist', {
    template: require('./mylist.html'),
    controller: MylistComponent,
    controllerAs: 'mylistCtrl'
  })
  .name;
