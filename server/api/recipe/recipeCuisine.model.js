'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('RecipeCuisine', {
    _id: {                                          // This is the recipeID, needs to be bound to id.Recipe
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      //This added because id is both the primary key of this table and the foreign key to recipe
      references: {
          //Relation this links to
          model: recipe,
          
          //Column name that this links to
          key: 'id',  //Should this be 'id' or '_id'?
          
          //Declares when to check the foreign key constraint. NOT SURE WHAT THIS SHOULD BE!!!
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    cuisineName: DataTypes.STRING
  });
}