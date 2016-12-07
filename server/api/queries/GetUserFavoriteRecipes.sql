/*
Description:
Finds info about the specified user's meals in the specified date range.
Parameters:
    UserId - ID for the user, comes from Users._id
    startDate - beginning of date range to find scheduled meals
    endDate - end of date range to find scheduled meals
Returns:    
    Returns tuples consisting of the following:
    - meal ID
    - Recipe ID
    - User ID
    - Date
    - Time of day for meal
*/

SELECT _id, RecipeId, UserId, date, timeOfDay
FROM ScheduledMeals
WHERE UserId = :UserId
AND date >= :startDate
AND date <= :endDate