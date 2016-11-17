/*The purpose of this routine is to generate random user data and schedules*/

var fs = require('fs');
var sqldb = require('./server/sqldb');
var randomFullName = require('random-fullName');
var random = require("random-js")(); // uses the nativeMath engine
var Recipe = sqldb.Recipe;
var User = sqldb.User;
var ScheduledMeal = sqldb.ScheduledMeal;
var Preferences = sqldb.Preferences;

var error_log = fs.createWriteStream('usergenerrors.txt');

Recipe.findAll().then((recipes)=>{
    
    console.log('Recipes: '+recipes.length);
    //Create 500 random users
    for (var i = 0; i<50; i++ ) {
        var name = randomFullName();
        //console.log(name);
        User.create({name:name}).then((user)=>{
            console.log(user.get());
            var likedRecipes;
            likedRecipes = GetRecipesToLike(recipes);
            var recipesToSchedule = GetRecipesToSchedule(recipes,likedRecipes);
            
            ScheduleRecipes(recipesToSchedule,user);
            LikeRecipes(likedRecipes,user);
            
            return null;
        }).catch(logError);
    }
    return recipes;
});
//Select 20-50 recipes that they like
function GetRecipesToLike(recipes) {
    var size = random.integer(20,50);
    return random.sample(recipes,size);
    
}
//Schedule 5-30 recipes that they like and 15-50 random
function GetRecipesToSchedule(recipes,likedRecipes){
    var recipesToSchedule = [];
    
    recipesToSchedule = random.sample(recipes,random.integer(15,50));
    recipesToSchedule.concat(random.sample(likedRecipes,random.integer(5,30)));
    return recipesToSchedule;
}
//Schedule the recipes with random dates and meals
function ScheduleRecipes(recipesToSchedule,user){
    var start = new Date(2016,9,15); //October 15, 2016
    var end = new Date(2016,10,15); //November 15, 2016
    
    recipesToSchedule.forEach(function (recipe){
        var scheduledMeal = {};
        scheduledMeal.RecipeId = recipe.get('_id');
        scheduledMeal.UserId = user.get('_id');
        scheduledMeal.timeOfDay = random.pick(['breakfast','lunch','dinner']);
        scheduledMeal.date = random.date(start,end);
        ScheduledMeal.create(scheduledMeal).then(()=>{return null;}).catch(logError);
        
    });
}

function LikeRecipes(recipesToLike,user) {
    recipesToLike.forEach(function(recipe){
        var pref =  {};
        pref.RecipeId = recipe.get('_id');
        pref.UserId = user.get('_id');
        Preferences.create(pref).then(()=>{return null;}).catch(logError);
    });
}

function logError(e){
    error_log.write(e.toString());
}


