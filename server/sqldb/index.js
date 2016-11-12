/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

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
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');
db.ScheduledMeal = db.sequelize.import('../api/scheduled-meal/scheduled-meal.model');
db.Schedule = db.sequelize.import('../api/schedule/schedule.model');

module.exports = db;
