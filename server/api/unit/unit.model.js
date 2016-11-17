'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Unit', {
    /*_id: { //Making Name be the primary key
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },*/
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    shortName: DataTypes.STRING,
    longName: DataTypes.STRING
  });
}
