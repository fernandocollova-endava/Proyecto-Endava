// Middleware express
const express = require("express")
const Router = express.Router()

// Import Models
const Allowance = require("../../db/models").StaticAllowance
const Employee = require("../../db/models").Employee

// Import Sequilize
const Sequelize = require('sequelize');
const Op = Sequelize.Op

Router.post('/', (req, res) => {
    Allowance.findAll({
        include: [{
            model: Employee,
            as: 'employee'
        }]
    })
        .then((data) => res.json(data))
})

module.exports = Router