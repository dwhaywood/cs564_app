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
db.ScheduledMeal = db.sequelize.import('../api/scheduled-meal/scheduled-meal.model');
db.Schedule = db.sequelize.import('../api/schedule/schedule.model');
db.Ingredient = db.sequelize.import('../api/ingredient/ingredient.model');
db.RecipeIngredients = db.sequelize.import('../api/ingredient/recipeIngredients.model');
db.Unit = db.sequelize.import('../api/unit/unit.model');
db.NutritionAttributes = db.sequelize.import('../api/nutrition-attributes/nutrition-attributes.model');
db.Recipe = db.sequelize.import('../api/recipe/recipe.model');
db.RecipeDiet = db.sequelize.import('../api/recipe/recipeDiet.model');
db.RecipeCuisine = db.sequelize.import('../api/recipe/recipeCuisine.model');
db.Preferences = db.sequelize.import('../api/preferences/preferences.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

module.exports = db;
