const express = require("express");
const Router = express.Router();

//ROUTER API'S
Router.use('/allowance', require('./allowance.js'))
Router.use('/employee', require('./employee.js'))


module.exports = Router;