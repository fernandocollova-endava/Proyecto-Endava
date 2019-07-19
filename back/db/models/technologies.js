const Sequelize = require("sequelize");
const db = require("../index");

const Technologies = db.define("technologies", {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  image:{
    type: Sequelize.TEXT,
    defaultValue:"image.jpg"
}
})
module.exports= Technologies;