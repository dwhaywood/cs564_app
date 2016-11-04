'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Ingredient', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ingredientName: DataTypes.STRING,
    aisle: DataTypes.STRING,
    image: DataTypes.STRING
  });
}