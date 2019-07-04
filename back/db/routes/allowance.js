const express = require("express")
const Router = express.Router()

const Allowance = require("../models").StaticAllowance



var Sequelize = require('sequelize');
const Op = Sequelize.Op


module.exports = Router