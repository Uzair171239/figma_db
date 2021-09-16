const express = require('express');
const personal = require('../models/personal');
const router = express.Router();
require('dotenv/config');
const jwt = require('jsonwebtoken');
const { response } = require('express');
// const auth = require('./authentication');

router.get('/dashboard',authenticateToken, async (req, res) => {
    try{
        // const user = await personal.findOne({ email });
        
        // if(user == null) return res.status(404).send('Record not found');
        
        res.json('hello '+ req.user.username);
   }catch(err){
       res.json( {message: err});
   }
});

router.post('/',async (req, res) => {
    try{
        const user = await personal.findOne({ email: req.body.email, password: req.body.password });;
        // res.send(user);
        // if (user && (await bcrypt.compare(  user.password )))
        if(user){
            const accessToken = jwt.sign(user.password, process.env.SECRET_TOKEN);
            return(accessToken);
            // res.send(accessToken);
        }
        else 
            res.json('username or password is incorrect');
        } catch(err){
            res.send( {message: err});
        }
   
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


module.exports = router;