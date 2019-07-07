const express = require("express");
const router = express.Router
//const Employee = require("../../db/models/");
var passport = require("../../config/passport");

router.post('/login', passport.authenticate("local"), function(req, res, next) {
    res.send(req.user)
})
router.get('/logout', function(req, res) {
    req.logout();
    res.json(req.user);
});


module.exports = router;