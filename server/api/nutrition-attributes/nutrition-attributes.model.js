    'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('NutritionAttributes', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
      attribute: DataTypes.STRING,
      amount: DataTypes.DOUBLE,
      unit: DataTypes.STRING,
      percentDailyValue: DataTypes.DOUBLE
  });
}
