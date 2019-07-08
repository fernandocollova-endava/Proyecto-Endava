const express = require("express");
const router = express.Router()
//const Employee = require("../../db/models/");
var passport = require("../../config/passport");

router.post('/login', passport.authenticate("local"), function(req, res, next) {
    console.log("so el emploeeee", req.body)
    res.send(req.user)
})
router.get('/logout', function(req, res) {
    req.logout();
    res.send("logoutOK");
});
router.get('/logged', function(req, res, next) {
    // console.log("entre al logged!!")
    // console.log(req.user, 'SOY EL REQ.USER')
    res.send(req.user)
})


module.exports = router;