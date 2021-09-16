const express = require('express'); //  database
const app = express(); 
const mongoose = require('mongoose'); // for connectivity with database
require('dotenv/config'); // for hiding database username and password
const personalRoute = require('./routes/pers_info'); 
const professionalRoute = require('./routes/prof_info'); 
const skillsRoute = require('./routes/skills_info'); 
const homeRoute = require('./routes/home_info'); 
const loginRoute = require('./routes/login'); 
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
app.use('/login', loginRoute);
app.use('/login/dashboard',authenticateToken, async (req, res) => {
        try{
            res.json('hello '+ req.user);
       }catch(err){
           res.json( {message: err});
       }
    });

app.use('/', homeRoute);

// connect to db
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('connected to db');
});

app.listen(port, () => {
    console.log(`the listening port is http://localhost:${port}`);
});

function authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        if(token == null) return res.sendStatus(401);
        
        jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
            if(err) return res.sendStatus(403)
            req.user = user
            next();
        })
    }