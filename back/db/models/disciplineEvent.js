const Sequelize = require("sequelize")
const db = require ("../index")
const moment = require ("moment")

const DisciplineEvent = db.define('disciplineEvent', {
  
  topic: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW
  },
  time:{

    type: Sequelize.TIME,
   
  },
  description:{
    type: Sequelize.TEXT,
    allowNull: false,
  },
  adminComment:{
    type: Sequelize.STRING,
},
  status:{
    type: Sequelize.STRING,
    validate: {
        notEmpty: true,
    },
},

})

module.exports = DisciplineEvent;