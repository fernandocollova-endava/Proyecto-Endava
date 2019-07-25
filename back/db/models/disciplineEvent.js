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
      // get: function() {
      //     let time = this.getDataValue('CreateTime')
  
      //     if (moment(time, moment.ISO_8601, true).isValid()) {
      //       console.log("es time", time)
      //         return moment(this.getDataValue('CreateTime')).format('HH:mm:ss')
      //     } else {
      //         return time
      //     }
      // }
  },
  description:{
    type: Sequelize.TEXT,
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