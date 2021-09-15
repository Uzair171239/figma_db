const express = require('express'); //  database
const app = express(); 
const mongoose = require('mongoose'); // for connectivity with database
require('dotenv/config'); // for hiding database username and password
const personalRoute = require('./routes/pers_info'); 
const professionalRoute = require('./routes/prof_info'); 
const skillsRoute = require('./routes/skills_info'); 
const homeRoute = require('./routes/home_info'); 
let port = process.env.PORT || 3001;
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/personal', personalRoute);
app.use('/personal/professional', professionalRoute);
app.use('/personal/professional/skills', skillsRoute);

app.use('/', homeRoute);

// connect to db
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('connected to db');
});

app.listen(port, () => {
    console.log(`the listening port is http://localhost:${port}/personal`);
});