const express = require("express");
const Router = express.Router();
const DisciplineEvent = require("../../db/models").DisciplineEvent;
const Employee = require("../../db/models/").Employee;
const Technologie = require("../../db/models/").Technologies;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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
    }).then(newEvent => {
      Technologie.findOne({
        where: {
          name: req.body.data.techName
        }
      })
        .then(technologie => {
          newEvent.setEmployee(employee);
          newEvent.setTechnologie(technologie);
        })
        .then(employeeEvent => res.send(employeeEvent));
    });
  });
});

Router.delete("/:id/delete", function(req, res) {
  DisciplineEvent.destroy({
    where: {
      id: req.params.id
    }
  }).then(resp => {
    res.sendStatus(204);
  });
});

Router.put ("/:id/edit", function(req, res){


  DisciplineEvent.update(
    {
      status: req.body.status,
      adminComment: req.body.observation
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(resp => {

    res.sendStatus(201);
  });

})


Router.get("/findActive/:id", function(req, res) {
  
  DisciplineEvent.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Employee,
        as: "employee",
        attributes: ["name", "id"]
      },
      {
        model: Technologie,
        as: "technologie"
      }
    ]
  }).then(activeEvent => {
  
    res.send(activeEvent);
  });
});

Router.get("/technologies", function(req, res) {
  Technologie.findAll({
    order: [["name", "ASC"]]
  }).then(techList => res.send(techList));
});

Router.get("/", function(req, res) {
  

  let employeeQuery = req.query.adminUrl ? { id: { [Op.ne]: req.query.userId } }: {};
  let statusQuery = req.query.status ?{status:req.query.status}:{}  

  DisciplineEvent.findAll({
    //3) Luego busco todos los eventos, incluyendo el modelo Employee,
    //donde el id de empleado coindida con que que me interesa (employee)
    where: statusQuery, //4) La tabla intermedia es virtual, ergo no uso mas que "include" y "where"

    include: [
      {
        model: Employee,
        as: "employee",
        attributes: ["name", "id"],
        where: employeeQuery
      },

      {
        model: Technologie, //5) traigo los datos que necesito de la tabla Technologie
        as: "technologie"
      }
    ],
    attributes: ["topic", "status", "date", "time", "description", "id"]
  }).then(eventList => {
   
    res.send(eventList);
  });
});

Router.get("/:id", function(req, res) {
 
  DisciplineEvent.findAll({

    where:{
      employeeId:req.params.id
    },

    include: [
      {
        model: Technologie,
        as: "technologie"
      },
      {
        model: Employee,
        as: "employee",
        attributes: ["name"]
      }
    ],
    attributes: ["topic", "status", "date", "time", "description"], // filtro datos que necesito
    order: [["date", "DESC"]] //ordeno de forma ascendente, por fecha
  }).then(eventList => {
    res.send(eventList);
  });
});
module.exports = Router;
