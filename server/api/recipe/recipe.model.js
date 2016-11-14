'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Recipe', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    recipeName: DataTypes.STRING,
    readyInMinutes: DataTypes.INTEGER,
    servings: DataTypes.INTEGER,
    imageAddress: DataTypes.STRING,
    sourceURL: DataTypes.STRING,
    sourceName: DataTypes.STRING,
    veryPopular: DataTypes.BOOLEAN,
    
    //info: DataTypes.STRING,
    //active: DataTypes.BOOLEAN
  });
}