'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('RecipeIngredients', {
    _id: {
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
    ingredientOrder: DataTypes.INTEGER,
    //ingredientID: DataTypes.INTEGER,                // This is foreign key for INGREDIENT table
    ingredientID: {
        type: Sequelize.INTEGER,        //Noticed in example in Sequelize documentation it defines the type within {} and uses 'Sequelize.TYPE'
                                        //Maybe this is the same as not using {} and just saying 'DataTypes.TYPE' - do you know?
        references: {
            //Relation this links to
            model: ingredient,
            //Column name that this links to
            key: 'id',  //Should this be 'id' or '_id'?
            //Declares when to check the foreign key constraint. NOT SURE WHAT THIS SHOULD BE!!!
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    amount: DataTypes.INTEGER,
    //unitID: DataTypes.INTEGER,                      // This is foreign key for UNIT table
    unitID: {
        type: Sequelize.INTEGER,        //Noticed in example in Sequelize documentation it defines the type within {} and uses 'Sequelize.TYPE'
                                        //Maybe this is the same as not using {} and just saying 'DataTypes.TYPE' - do you know?
        references: {
            //Relation this links to
            model: unit,                //Not sure if this is actual name of UNIT table (Summer created this), adjust as needed
            //Column name that this links to
            key: 'id',  //Should this be 'id' or '_id'?
            //Declares when to check the foreign key constraint. NOT SURE WHAT THIS SHOULD BE!!!
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },

    originalString: DataTypes.STRING
  });
}