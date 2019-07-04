const express = require("express");
const Router = express.Router();

//ROUTER API'S
Router.use('/allowance', require('../models').StaticAllowance)
Router.use('/employee', require('../models').Employee)

module.exports = Router;