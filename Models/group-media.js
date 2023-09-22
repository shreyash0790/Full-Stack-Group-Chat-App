const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const GroupMedia = sequelize.define('GroupMedia', {
  Id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false
  },
  
  MediaName:{
    type: Sequelize.STRING,
    
   }


})
module.exports = GroupMedia;