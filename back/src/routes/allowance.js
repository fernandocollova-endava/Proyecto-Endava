// Middleware express
const express = require("express")
const Router = express.Router()

// Import Models
const Allowance = require("../models").StaticAllowance

var Sequelize = require('sequelize');
const Op = Sequelize.Op

Router.get('/',(req, res)=>{
    res.send('OK - Allowance')
})

module.exports = Router