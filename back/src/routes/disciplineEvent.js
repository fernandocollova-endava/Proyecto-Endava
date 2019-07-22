const express = require("express");
const Router = express.Router();
const DisciplineEvent = require("../../db/models").DisciplineEvent;
const Employee = require("../../db/models/").Employee;
const Technologie = require("../../db/models/").Technologies;

Router.post("/", function(req, res) {
  console.log("soy el req", req.body.data);
  Employee.findOne({
    where: {
      id: req.body.user.id
    }
  }).then(employee => {
    DisciplineEvent.create({
      topic: req.body.data.topic,
      date: req.body.data.date,
      time: req.body.data.time,
      description: req.body.data.observation,
      status: "pending"
    }) .then(newEvent => {

    Technologie.findOne({
      where: {
        name: req.body.data.techName
      }
    }).then(technologie => {
          newEvent.setEmployee(employee);
          newEvent.setTechnologie(technologie);
        })
        .then(employeeEvent => res.send(employeeEvent));
    });
  });
});

Router.get("/technologies", function(req, res) {
  Technologie.findAll({
    order: [["name", "ASC"]]
  }).then(techList => res.send(techList));
});

Router.get("/:id", function(req, res) {
  Employee.findOne({
    // 1) primero traigo el empleado
    where: {
      id: req.params.id
    }
  }).then(employee => {

    
    DisciplineEvent.findAll({
      //2) Luego busco todos los eventos, incluyendo el modelo Employee,
      //donde el id de empleado coindida con que que me interesa (employee)
      include: [
        {
          model: Employee,
          as: "employee",
          where: {
            id: employee.id //3) La tabla intermedia es virtual, ergo no uso mas que "include" y "where"
          },
          attributes: []
        },
        // {
        //   model: Technologie,
        //   as:"technologie",
        //   where:{
        //     id:
        //   }

        // }
      ],
      attributes: ["topic", "status", "date", "time", "description"]

    }).then(eventList => res.send(eventList));
  });
});

module.exports = Router;
