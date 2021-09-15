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

app.use(cors(function(req, res, next){
    res.header("Access-control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept, Authorization"
    );
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,DELETE',);
    next();
}
));

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