/*
Description:
Finds a list of suggested recipe IDs based on the favorite recipes of friends
Criteria:
    - Suggested recipe is in the list of favorite recipes for at least 1 friend
      of the specified user
    - Suggested recipe ID is not already in the user's favorites
Parameters:
    UserId - ID for the user, comes from Users._id
Returns:    
    List of recipe IDs that will be suggested to the current user, limited
    to a maximum of 30
*/

SELECT DISTINCT Preferences.RecipeId
FROM Preferences
WHERE Preferences.RecipeId IN
    (SELECT DISTINCT Preferences.RecipeId
     FROM Preferences
     WHERE Preferences.UserId IN
        (SELECT Friends.FriendId
         FROM Friends
         WHERE _id = :UserId)
    )
AND Preferences.RecipeId NOT IN
    (SELECT DISTINCT Preferences.RecipeId
     FROM Preferences
     WHERE Preferences.UserId = :UserId)
LIMIT 30