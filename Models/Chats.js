const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const UsersMsg = sequelize.define('UsersMsg', {
  Id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false
  },
  Messages: {
    type: Sequelize.STRING,
    allowNull: false,
  },

})
module.exports = UsersMsg;