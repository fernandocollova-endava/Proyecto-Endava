const Sequelize = require("sequelize")
const db = require ("../index")

const DisciplineEvent = db.define('disciplineEvent', {
  
  topic: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  description:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  status:{
    type: Sequelize.STRING,
    validate: {
        notEmpty: true,
    },
},

})

module.exports = DisciplineEvent;