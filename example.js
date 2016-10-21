//Define the recipe model
var Recipe = sequelize.define('recipe', {
  title: Sequelize.STRING,
  id: Sequelize.INTEGER,
  readyInMinutes: Sequelize.INTEGER
})

Recipe.sync({force: true})



var recipeObject = {}
// These code snippets use an open-source library. http://unirest.io/nodejs
unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/496509/analyzedInstructions?stepBreakdown=true")
.header("X-Mashape-Key", "dkK9bOKEkNmshOLDuw9rHq59F0Twp1fvyxcjsn99AoUm6XvMfC")
.header("Accept", "application/json")
.end(function (result) {
  recipeObject=result;
});

Recipe.create(recipeObject)