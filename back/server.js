const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const db = require('./db/models/index').db
const indexRouter = require('./src/routes/index')
const cookieParser = require('cookie-parser');
const session = require("express-session");
const passport = require("./config/passport");

// MIDDLEWARES

app.use('/assets', express.static(path.join(__dirname + '/src/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Passport middleware
app.use(session({ secret: "endava", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.user = req.user;
    next()  
})
app.use('/api', indexRouter)

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/src/public', 'index.html'))
})

db.sync({ force: false })
    .then(() => {
        app.listen(3000)
        console.log('Your server available at http://localhost:3000')
    })