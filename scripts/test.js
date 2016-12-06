var sqldb = require('../server/sqldb');
var Ingredient = sqldb.Ingredient;
//var Unit = sqldb.Unit;
var Recipe = sqldb.Recipe;
//var RecipeDiet = sqldb.RecipeDiet;
//var RecipeCuisine = sqldb.RecipeCuisine;
var RecipeIngredients = sqldb.RecipeIngredients;
var NutritionAttributes = sqldb.NutritionAttributes;

Recipe.find({where:{_id:528053}, include:[Ingredient]}).then((result)=>{
    
    for (let ing of result.Ingredients) {
        console.log(ing.ingredientName);
        console.log(ing.RecipeIngredients.originalString);
    }
    
    //console.log(result);
});