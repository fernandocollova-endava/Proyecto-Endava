const Sequelize = require("sequelize");
const db = require("../index");

const HomeOffice = db.define("homeOffice", {
  date: {
    type: Sequelize.STRING,
  }
})
module.exports= HomeOffice;