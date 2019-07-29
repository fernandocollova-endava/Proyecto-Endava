const express = require("express");
const Router = express.Router();
const DisciplineEvent = require("../../db/models").DisciplineEvent;
const Employee = require("../../db/models/").Employee;
const Technologie = require("../../db/models/").Technologies;

Router.post("/", function(req, res) {
 
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

Router.get("/", function(req, res) {
 
  req.query.userId? //1)pregunto si el fech me viene con parametro userId o no
  Employee.findOne({
    // 2) traigo el empleado
    where: {
      id: req.query.userId
    }
  }).then(employee => {
    
    
    DisciplineEvent.findAll({
      //3) Luego busco todos los eventos, incluyendo el modelo Employee,
      //donde el id de empleado coindida con que que me interesa (employee)
      include: [
        {
          model: Employee,
          as: "employee",
          where: {
            id: employee.id //4) La tabla intermedia es virtual, ergo no uso mas que "include" y "where"
          },
          attributes: []
        },
        {
          model: Technologie, //5) traigo los datos que necesito de la tabla Technologie
          as:"technologie",
        },
       
      ],
      attributes: ["topic", "status", "date", "time", "description"]

    }).then(eventList => {
      res.send(eventList)
      
    })
     
  }): // en caso de no haber userId
  DisciplineEvent.findAll({

    include: [
      {
        model: Technologie,
        as:"technologie",
      },
    ],
    attributes: ["topic", "status", "date", "time", "description"], // filtro datos que necesito
    order: [["date", "ASC"]] //ordeno de forma ascendente, por fecha

  }).then(eventList => {
    res.send(eventList)
    
  }); 
});

module.exports = Router;
