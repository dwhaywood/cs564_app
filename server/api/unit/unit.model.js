'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Unit', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    shortName: DataTypes.STRING,
    longName: DataTypes.STRING,
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  });
}
