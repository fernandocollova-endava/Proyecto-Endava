const express = require("express");
const router = express.Router();
const Employee = require("../../db/models/").Employee;
const passport = require("../../config/passport");

// Funciones adicionales
const MulterFn = require("../functions/multerAvatar");

router.post("/login", passport.authenticate("local"), function (req, res, next) {
  res.send(req.user);
});
router.get("/logout", function (req, res) {
  req.logout();
  res.send("logoutOK");
});
router.get("/logged", function (req, res, next) {
  res.send(req.user);
});
router.post("/password/profile/update", function (req, res, error) {

    Employee.findByPk(req.body.userId).then(employee => {
      res.send(employee.updatePassword(req.body.oldPass, req.body.password)); //llamo a un metodo de instancia presente en el modelo
    })

});

router.post("/password/update", function (req, res, error) {
  Employee.findByPk(req.body.userId).then(employee => {
    res.send(employee.updatePassword(null, req.body.password)); //llamo a un metodo de instancia presente en el modelo
  });
});

// Avatar
router.put("/avatar", MulterFn.single("file"), function (req, res, error) {
  const fileName = req.file.filename;
  Employee.update(
    { avatar: fileName },
    { returning: true, where: { id: req.body.userid } }
  )
    .then(resp => {
      res.json(fileName)

    })
    
});

module.exports = router;
