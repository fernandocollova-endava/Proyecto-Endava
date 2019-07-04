const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const db = require('./db/index')
const indexRouter = require('./src/routes/index.js')

const cookieParser = require('cookie-parser');
const session = require("express-session");

// Requiring passport as we've configured it
const passport = require("./config/passport");

// // SESSION
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname + '/public')));

app.use('/api', indexRouter)

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/src/public', 'index.html'))
})

db.sync({ force: false })
    .then(() => {
        app.listen(3000)
        console.log('Your server available at http://localhost:3000')
    })