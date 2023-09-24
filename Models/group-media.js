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
    allowNull: false
   },
  Caption:{
    type: Sequelize.STRING,
    allowNull: false
   }


})
module.exports = GroupMedia;