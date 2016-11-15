'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    //uri: 'sqlite://',
    uri: 'postgres://postgres:admin@localhost:5432/eatbetterdb',
    options: {
      
      logging: false,
      //storage: 'dev.sqlite',
      define: {
        timestamps: false
      }
    }
  },

  // Seed database on startup
  seedDB: true

};
