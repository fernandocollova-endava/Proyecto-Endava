// Middleware express
const express = require("express");
const Router = express.Router();
const nodemailer = require("nodemailer");
const moment = require("moment");
// Funciones adicionales
const MulterFn = require("../functions/multer");
// Import Models
const Allowance = require("../../db/models").Allowance;
const Employee = require("../../db/models").Employee;
const AllowanceDetail = require("../../db/models").AllowanceDetail;
// Import Sequilize
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

Router.get("/", function(req, res) {
  //trae las allowances generales
  Allowance.findAll({
    where: {
      active: true,
      name: {
        [Op.ne]: "book"
      }
    },
    order: [["id", "asc"]],
    attributes: ["name", "imgUrl", "completeName", "id", "fixedAmount"]
  }).then(allowanceList => {
    res.send(allowanceList);
  });
});

Router.get("/admin", function(req, res) {
  //trae las allowances que se ven el admin panel
  AllowanceDetail.findAll({
    include: [
      {
        model: Employee,
        as: "employeeDetail"
      },
      {
        model: Allowance,
        as: "allowanceDetail",
        where: {
          name: {
            [Op.ne]: "book"
          }
        }
      }
    ]
  }).then(allowanceList => {
    res.json(allowanceList);
  });
});
Router.get("/book/current", function(req, res) {
  //trae los current books

  AllowanceDetail.findAll({
    where: Sequelize.where(
      Sequelize.fn("date_part", "month", Sequelize.col("paymentDate")),
      req.query.month
    ),

    include: [
      {
        model: Employee,
        as: "employeeDetail",
        attributes: ["name"],
        where: {
          id: { [Op.ne]: req.query.userId } //todos menos el req.user logueado
        }
        // employeeQuery
      },
      {
        model: Allowance,
        as: "allowanceDetail",
        attributes: ["name", "id"],
        where: {
          name: "book"
        }
      }
    ]
  }).then(currentBookAllowances => {
    res.send(currentBookAllowances);
  });
});

Router.get("/book", function(req, res) {
  // trae los "history books"

  let employeeQuery =
    req.query.adminPath == "true"
      ? { id: { [Op.ne]: req.query.userId } } // Trae todos los usuarios excepto el propio
      : { id: req.query.userId };

  AllowanceDetail.findAll({
    include: [
      {
        model: Employee,
        as: "employeeDetail",
        attributes: ["name"],
        employeeQuery
      },
      {
        model: Allowance,
        as: "allowanceDetail",
        attributes: ["name", "id"],
        where: {
          name: "book"
        }
      }
    ]
  }).then(bookAllowance => {
    res.send(bookAllowance);
  });
});

Router.get("/book/installments/:receiptPath/:allowanceId", function(req, res) {
  AllowanceDetail.findAll({
    attributes: [
      "paymentDate",
      "installments",
      "amount",
      "limitAmount",
      "employeeAmount",
      "status"
    ],
    where: {
      receiptPath: req.params.receiptPath
    },
    include: [
      {
        model: Allowance,
        as: "allowanceDetail",
        where: {
          id: req.params.allowanceId
        },
        attributes: []
      }
    ],
    limit: 10,
    order: [["id", "DESC"]]
  }).then(allowanceList => {
    res.json(allowanceList);
  });
});

// Insert allowance
Router.post("/", MulterFn.single("file"), (req, res) => {
  //crea todas las allowances, generales y book
  const fileName = req.file.filename;

  Allowance.findOne({
    where: {
      name: req.body.allowanceName.toLowerCase()
    }
  }).then(allowanceInstance => {
    // Instancia de Reintegro
    Employee.findOne({
      where: {
        id: req.body.userid
      }
    })
      .then(employeeInstance => {
        // Instancia del Empleado
        // Inserta en la instancia de allowance la instancia de employee
        // Genera la relacion empleado vs reintegro (Employee_Allowance)
        if (req.body.allowanceName == "book") {
          // si es book
          let paymentDate = paymentDateFn(
            allowanceInstance.dataValues.createdAt, //Fecha creacion
            allowanceInstance.dataValues.limitDay
          );

          // Calculo de total reintegro:
          var totalAmountFixed = allowanceInstance.dataValues.fixedAmount;
          var totalEmployeeAmount = req.body.employeeAmount;
          var totalAmount =
            totalEmployeeAmount > totalAmountFixed
              ? totalAmountFixed
              : totalEmployeeAmount;
          var remainingBookAmount = totalEmployeeAmount; // calculo el remanente
          var cant = Math.ceil(remainingBookAmount / totalAmountFixed); // calculo en cuantas "partes" se pagara ese remanente

          for (let i = 0; i <= cant; i++) {
            //itero esas "n" partes, por cada pasada creo
            // un allowance de book
            // evito el valor negativo
            if (remainingBookAmount < 0) break;

            AllowanceDetail.create({
              amount: totalAmount,
              employeeAmount: totalEmployeeAmount,
              installments: `${i + 1}/${cant}`,
              limitAmount: totalAmountFixed,
              paymentDate: moment(paymentDate, "DD-MM-YYYY").add(i, "months"),
              remainingBookAmount: remainingBookAmount,
              observation: req.body.observation,
              receiptPath: fileName,
              status: "pending"
            }).then(AllowanceDetail_Instance => {
              // Instancia de la creación del registro final Empleado
              AllowanceDetail_Instance.setEmployeeDetail(employeeInstance.id);
              // Instancia de la creación del registro final Beneficio
              AllowanceDetail_Instance.setAllowanceDetail(allowanceInstance.id);
            });
            remainingBookAmount = remainingBookAmount - totalAmountFixed; //actualizo el reiamning en cada pasada
            remainingBookAmount >= totalAmountFixed //finalmente, si remaaining es mayor totalAmount, el valor
              ? (totalAmount = totalAmountFixed) // se topea en el maximo (totalAmountFixed)
              : (totalAmount = remainingBookAmount); //si es menor, igualo al valor remanente.
          }
        } else {
          //si es un allawance normal
          let paymentDate = paymentDateFn(
            allowanceInstance.dataValues.createdAt, //Fecha creacion
            allowanceInstance.dataValues.limitDay
          );
          var totalAmountFixed = allowanceInstance.dataValues.fixedAmount;
          var totalEmployeeAmount = req.body.employeeAmount;
          var totalAmount =
            totalEmployeeAmount > totalAmountFixed
              ? totalAmountFixed
              : totalEmployeeAmount;

          // Genero un nuevo registro de detalle en la tabla final AllowanceDetail
          AllowanceDetail.create({
            amount: totalAmount,
            employeeAmount: totalEmployeeAmount,
            installments: "1",
            limitAmount: totalAmountFixed,
            paymentDate: paymentDate,
            observation: req.body.observation,
            receiptPath: fileName,
            status: "pending"
          }).then(AllowanceDetail_Instance => {
            // Instancia de la creación del registro final Empleado
            AllowanceDetail_Instance.setEmployeeDetail(employeeInstance.id);
            // Instancia de la creación del registro final Beneficio
            AllowanceDetail_Instance.setAllowanceDetail(allowanceInstance.id);
          });
        }
      })
      .then(data => {
        // Responde el nombre del archivo..
        res.json(fileName);
      })
      .catch(err => res.json(err));
  });
});

//RUTA BUSQUEDA DE TODOS LOS BENEFICIOS
Router.get("/search/", function(req, res) {
 
  let employeeQuery =
    req.query.allUser == "true"
      ? { id: { [Op.ne]: req.query.userId } }
      : { id: req.query.userId }; // Trae todos los usuarios excepto el propio
  let globalQuery = {}; // query general que define si se filtra con status, y con fechas
  let filterQuery = {}; // query para definir si asigno propiedades del "where" en la query

  if (req.query.dateEnd || req.query.status) {
    req.query.dateEnd
      ? (globalQuery.paymentDate = {
          [Op.between]: [req.query.dateStart, req.query.dateEnd]
        })
      : null; //si hay fecha o status, seteo uno o los dos como filtros
    req.query.status ? (globalQuery.status = req.query.status) : null;
  } else globalQuery = Sequelize.where(Sequelize.fn("date_part", "month", Sequelize.col("paymentDate")), moment().month() + 2);
  // primer estado por default, no tengo fecha ni estado. Ejecuto un where con consulta del mes en curso

  if (req.query.allUser == "true") { // manejo de vistas admin / user, 
    filterQuery.name = { [Op.ne]: "book" };  // indico que no quiero books en vista admin
    req.query.allowanceId ? (filterQuery.id = req.query.allowanceId) : null; // permito que si hay otros allwances se puedan ver
  } else req.query.allowanceId ? (filterQuery.name = null) : req.query.allowanceId;
      //en su defecto, vista employee (my alowances) no aplica filtro directamente. 

  AllowanceDetail.findAll({
    where: globalQuery, // setea el valor dependiendo de las condiciones dadas arriba

    attributes: [
      "amount",
      "employeeAmount",
      "limitAmount",
      "paymentDate",
      "status",
      "receiptPath",
      "adminComment",
      "id"
    ],
    include: [
      {
        model: Employee,
        as: "employeeDetail",
        attributes: ["name"],
        where: employeeQuery
        //[Op.in]: arraIds //ese filtro me busca esos id del array en mi tabla AllowanceDetail
      },
      {
        model: Allowance,
        as: "allowanceDetail",
        where: filterQuery
      }
    ],
    order: [["paymentDate", "DESC"]]
  }).then(allowanceList => {
    res.json(allowanceList);
  });
  // .catch(() => res.sendStatus(404));
});

// RUTA FETCH HISTORY EMPLOYEE / allowance ( limit 10 )
Router.get("/history/:employeeId/:allowanceId", function(req, res) {
  AllowanceDetail.findAll({
    attributes: [
      "paymentDate",
      "installments",
      "amount",
      "limitAmount",
      "employeeAmount",
      "status"
    ],
    include: [
      {
        model: Employee,
        as: "employeeDetail",
        attributes: [],
        where: {
          id: req.params.employeeId
        }
      },
      {
        model: Allowance,
        as: "allowanceDetail",
        where: {
          id: req.params.allowanceId
        },
        attributes: []
      }
    ],
    limit: 10,
    order: [["id", "DESC"]]
  }).then(allowanceList => {
    res.json(allowanceList);
  });
});

// RUTA PARA BUSCAR EL ALLOWANCE ACTIVO (CONSULTADO)
Router.get("/findActive/:id", function(req, res) {
  AllowanceDetail.findOne({
    attributes: [
      "amount",
      "observation",
      "employeeAmount",
      "limitAmount",
      "paymentDate",
      "status",
      "receiptPath",
      "adminComment",
      "id"
    ],
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Allowance,
        as: "allowanceDetail",
        attributes: ["name"]
      },
      {
        model: Employee,
        as: "employeeDetail",
        attributes: ["name", "id"]
      }
    ]
  }).then(allowanceList => {
    res.send(allowanceList);
  });
});

// RUTA PARA ELIMINAR EL ALLOWANCE ACTIVO (CONSULTADO)
Router.delete("/:id/delete", function(req, res) {
  AllowanceDetail.destroy({
    where: {
      id: req.params.id
    }
  }).then(resp => {
    res.sendStatus(204);
  });
});

// RUTA PARA MODIFICAR EL ESTADO EL ALLOWANCE
Router.put("/:id/edit", function(req, res) {
  AllowanceDetail.update(
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
});

// COUNT CANTIDAD DE ALLOWANCE PENDIENTES DE APROBACION
Router.get("/count", function(req, res) {
  AllowanceDetail.findAll({
    attributes: [],
    where: {
      status: "pending"
      //  where: {
      //     name: {
      //       [Op.ne]: "book"
      //     }
      //   }
    },
    include: [
      {
        model: Employee,
        as: "employeeDetail",
        attributes: [],

        where: {
          id: { [Op.ne]: req.query.userId }
        }
      }
    ]
  }).then(data => {
    res.json(data.length);
  });
});

function paymentDateFn(date, limitDate) {
  let valDate = date.getDay() <= limitDate ? 1 : 2;
  return new Date(date.getFullYear(), date.getMonth() + valDate, 1);
}

Router.post("/emailConfirm", function(req, res) {
  var transporter = nodemailer.createTransport({
    //OBJETO TRANSPORTER DISPARA ENVIO DE MAIL
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL //SSL (Secure Socket Layer) protocolo de seguridad
    auth: {
      user: "automaticEmailConfirm@gmail.com", //
      pass: "bootcamp2019" //
    }
  });

  var mailOptions = {
    from: "automaticEmailConfirm@gmail.com", //DATOS DEL MAIL QUE RECIVE
    to: "admProjectPlataforma5@gmail.com", // DATOS DEL MAIL QUE RECIVE
    subject: `You have received a new allowance requirement, pre-authorisation is required.
       `,
    html: `
    <img
    src="https://careers.endava.com/en/-/media/EndavaDigital/Endava/Images/MetaDataImages/preview-image.ashx"
    alt="Endava" width = 200px />
      <p style= "font-size:18px">
      You have received a new allowance requirement, pre-authorisation is required.
      For further information, consult the section Admin Panel.  
      </p>

          <h3> Details:</h3>
          <ul style= "font-size:16px">
              <li>
              UserName: ${req.body.userData.name}
              </li>
              <li>
              AllowanceName:  ${req.body.allowanceName}
              </li>
            
          </ul>
          <h3>  Please, follow this link http://40.117.118.106:3000/ to authorize </h3>
      `
  };
  console.log("sending email", mailOptions);
  transporter.sendMail(mailOptions, function(error, info) {
    console.log("senMail returned!");
    if (error) {
      //ATAJA POSIBLES ERRORES
      console.log("ERROR!!!!!!", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

module.exports = Router;
