const express = require('express'); //  database
const app = express(); 
const mongoose = require('mongoose'); // for connectivity with database
require('dotenv/config'); // for hiding database username and password
const personalRoute = require('./routes/pers_info'); 
const professionalRoute = require('./routes/prof_info'); 
const skillsRoute = require('./routes/skills_info'); 
// const homeRoute = require('./routes/home_info'); 
const loginRoute = require('./routes/login'); 
const IOT = require('./routes/iot'); 
// const dashboardRoute = require('./routes/dashboard'); 
let port = process.env.PORT || 3001;
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}));

app.use(cors());

// app.use('/personal', personalRoute);
// app.use('/personal/professional', professionalRoute);
// app.use('/personal/professional/skills', skillsRoute);
// app.use('/login', loginRoute);
app.use("iotTest", IOT)
app.get("/test", (req, res) => {
    res.send({
        message: "Hello World"
    })
});
// app.use('/dashboard', dashboardRoute);

// app.use('/', homeRoute);

// connect to db
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('connected to db');
});

app.listen(port, () => {
    console.log(`the listening port is http://localhost:${port}`);
});