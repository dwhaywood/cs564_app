SELECT recipeName
  FROM Recipes
       JOIN
       ScheduledMeals ON Recipes._id = ScheduledMeals.RecipeId
 WHERE date >= :startDate AND 
       date <= :endDate AND UserId = :user