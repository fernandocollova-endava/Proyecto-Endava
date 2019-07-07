const express = require("express");
const Router = express.Router();

//ROUTER API'S
Router.use('/allowance', require('./allowance'))

//Router.use('/allowance', require('./allowance'))



module.exports = Router;