/**
 * Sequelize initialization module
 */

'use strict';

//import path from 'path';
var config = require('../config/environment');
var Sequelize = require('sequelize');

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
//Define primary entity models for Ingredients-Recipe-Units
db.Ingredient = db.sequelize.import('../api/ingredient/ingredient.model');
db.Unit = db.sequelize.import('../api/unit/unit.model');
db.Recipe = db.sequelize.import('../api/recipe/recipe.model');


//Set up relationships
db.RecipeIngredients = db.sequelize.import('../api/ingredient/recipeIngredients.model');
db.Recipe.belongsToMany(db.Ingredient,{ through: db.RecipeIngredients});
db.Ingredient.belongsToMany(db.Recipe, {through: db.RecipeIngredients});
db.RecipeIngredients.belongsTo(db.Unit);


db.RecipeDiet = db.sequelize.import('../api/recipe/recipeDiet.model');
db.RecipeDiet.belongsTo(db.Recipe);

db.RecipeCuisine = db.sequelize.import('../api/recipe/recipeCuisine.model');
db.RecipeCuisine.belongsTo(db.Recipe);

db.NutritionAttributes = db.sequelize.import('../api/nutrition-attributes/nutrition-attributes.model');

//User specific models

db.Preferences = db.sequelize.import('../api/preferences/preferences.model');
db.User = db.sequelize.import('../api/user/user.model');
db.Friends = db.sequelize.import('../api/user/friends.model');
/*db.User.belongsToMany(db.Friends, {through: db.Friends, foreignKey: 'FriendId'});*/
db.User.belongsToMany(db.User, { as: 'Friends', through: db.Friends });


//Define relationships
db.ScheduledMeal = db.sequelize.import('../api/scheduled-meal/scheduled-meal.model');
/*Has Many Method*/
db.ScheduledMeal.belongsTo(db.Recipe);
db.ScheduledMeal.belongsTo(db.User);

/*Belongs to Many Method
db.Recipe.belongsToMany(db.User, {through: db.ScheduledMeal, unqiue: false});
db.User.belongsToMany(db.Recipe, {through: db.ScheduledMeal});*/

db.Recipe.belongsToMany(db.User, {through: db.Preferences});
db.User.belongsToMany(db.Recipe, {through: db.Preferences});

/* No longer using schedule
db.Schedule = db.sequelize.import('../api/schedule/schedule.model'); */
db.Thing = db.sequelize.import('../api/thing/thing.model');

module.exports = db;
