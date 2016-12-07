'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Friends', {
    _id: {                                          // This is the userId
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    FriendId: DataTypes.INTEGER
  });
}
