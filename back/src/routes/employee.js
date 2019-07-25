const express = require("express");
const router = express.Router();
const Employee = require("../../db/models/").Employee;
var passport = require("../../config/passport");

router.post("/login", passport.authenticate("local"), function(req, res, next) {
  res.send(req.user);
});
router.get("/logout", function(req, res) {
  req.logout();
  res.send("logoutOK");
});
router.get("/logged", function(req, res, next) {
  res.send(req.user);
});
router.post("/password/update", function(req, res, error) {
  console.log("soy req body", req.body);
  req.body.oldPass
    ? Employee.findOne({
        where: {
          password: req.body.oldPass
        }
      }).then(passOk => {
        console.log("soy passsOk", passOk);
        Employee.findByPk(req.body.userId).then(employee => {
          res.send(employee.updatePassword(req.body.password)); //llamo a un metodo de instancia presente en el modelo
        });
      })
    : Employee.findByPk(req.body.userId).then(employee => {
        res.send(employee.updatePassword(req.body.password));
      });
});

module.exports = router;
