/*
Description:
Compiles a shopping list of ingredients needed by all recipes for a
specified user's meals in the provided date range.
Parameters:
    UserId - ID for the user, comes from Users._id
    startDate - beginning of date range to find scheduled meals
    endDate - end of date range to find scheduled meals
Returns:    
    Returns tuples consisting of the following:
    - ingredient name
    - aisle
    - total amount for ingredient
    - unit associated with amount
    
    Results are grouped by both ingredient and unit, sorted by aisle
*/

SELECT Ingredients.ingredientName AS List_Item, Ingredients.aisle AS Aisle, SUM(RecipeIngredients.amount) AS Total_Amount, RecipeIngredients.UnitName AS Unit
FROM RecipeIngredients
JOIN Ingredients ON RecipeIngredients.IngredientId = Ingredients._id
WHERE RecipeIngredients.RecipeId IN
    (SELECT RecipeId
     FROM ScheduledMeals
     WHERE UserId = :UserId
     AND date >= :startDate
     AND date <= :endDate)
GROUP BY Ingredients._id, RecipeIngredients.UnitName
ORDER BY aisle