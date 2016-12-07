/*
Description:
Finds all recipes that have the string in "keyWord" in either the recipe name, diet name, or cuisine name.
Will update to additionally check dish type once that table is available.
Results limited to 100 for performance.
Parameters:
    keyWord - character string to search for
Returns:    
    List of matching recipe IDs (limited to 100 results)
*/

SELECT Recipes._id
FROM Recipes
left join RecipeDiets ON Recipes._id = RecipeDiets.RecipeId
left join RecipeCuisines ON Recipes._id = RecipeCuisines.RecipeId
WHERE recipeName LIKE ('%' || :keyWord || '%')
OR dietName Like ('%' || :keyWord || '%')
OR cuisineName Like ('%' || :keyWord || '%') LIMIT 100

/*Add condition to also search dietType once it exists*/