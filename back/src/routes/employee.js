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
router.get("/password/profile/update",passport.authenticate("local"), function(req, res, error) {

if(req.user){

  Employee.findByPk(req.body.userId).then(employee => {
    res.send(employee.updatePassword(req.body.password)); //llamo a un metodo de instancia presente en el modelo
  })
}else {
  console.log("entre acaaaaaaaaaaa else")
  res.sendStatus(401)}

});

router.post("/password/update", function(req, res, error) {
  Employee.findByPk(req.body.userId).then(employee => {
    res.send(employee.updatePassword(req.body.password)); //llamo a un metodo de instancia presente en el modelo
  });
});

module.exports = router;
