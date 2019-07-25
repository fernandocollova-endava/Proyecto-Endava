const express = require("express");
const Router = express.Router();
const HomeOffice = require("../../db/models").HomeOffice;
const Employee = require("../../db/models/").Employee;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

Router.post("/", function (req, res) {

    Employee.findOne({
        where: {
            id: req.body.idUser
        }
    }).then(employee => {
        // Instancia del empleado
        HomeOffice.create({
            date: req.body.date,
        })
            .then(newHome => {
                // instancia de home-Office
                return newHome.setEmployeeHomeOffice(employee);
            })
            .then(employeeEvent => res.send(employeeEvent));
    });
});

Router.get("/", function (req, res) {
    let month = ((Number(req.query.month) + 1) < 10) ? '0' + (Number(req.query.month) + 1) : (Number(req.query.month) + 1);
    let filter = req.query.year + '-' + month
    HomeOffice.findAll({
        where: {
            date: {
                [Op.like]: filter + '%',
            }
        },
        attributes: ['date'],
        include: [{
            model: Employee,
            as: 'employeeHomeOffice',
            attributes: ['name', 'surname'],
            where: {
                sector: req.query.sector
            }
        }]
    })
        .then(list => res.send(list))
})


module.exports = Router;
