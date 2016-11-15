/*jslint node: true */
'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('ScheduledMeal', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userName: DataTypes.STRING, //Link to User who scheduled this meal
    date: DataTypes.DATEONLY, //Date that the meal is planned for
    //recipeID: DataTypes.INTEGER, //Link to recipe
    timeOfDay: {
        type: DataTypes.ENUM,
        values: ['breakfast','lunch','dinner']
    },
  });
}
