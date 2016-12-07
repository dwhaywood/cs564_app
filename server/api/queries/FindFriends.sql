/*
Description:
Finds a list of suggested friends (user IDs) based similarities between users
Criteria:
    - Suggested user ID is not the current user ID
    - Suggested user ID is not already in the user's friends list
    - Suggested user has >1 recipe in their favorites that are also
      in the list of favorites for the current user
Parameters:
    UserId - ID for the user, comes from Users._id
Returns:    
    List of user IDs that will be suggested as friends for the current user,
    sorted in descending order of the number of recipes the suggested user
    has in common with the current user. Results limited to 30 user IDs
*/

SELECT Preferences.UserId
FROM Preferences
WHERE Preferences.UserId <> :UserId
AND Preferences.RecipeId IN
    (SELECT RecipeId
     FROM Preferences
     WHERE UserId = :UserId)
AND Preferences.UserId NOT IN
    (SELECT Friends.FriendId
     FROM Friends
     WHERE Friends._id = :UserId)
GROUP BY Preferences.UserId
HAVING COUNT(Preferences.UserId) > 1
ORDER BY COUNT(Preferences.UserId) DESC LIMIT 30