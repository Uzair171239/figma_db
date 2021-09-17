const express = require('express');
const personal = require('../models/personal');
const router = express.Router();
require('dotenv/config');
const jwt = require('jsonwebtoken');
const { response } = require('express');
async (recommended)
const bcrypt = require('bcrypt');
// const auth = require('./authentication');

router.get('/dashboard',authenticateToken, async (req, res) => {
    try{
        res.json('hello '+ req.user);
   }catch(err){
       res.json( {message: err});
   }
});

router.post('/',async (req, res) => {

    try{
        const hashPassword = bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            res.send(err);
        });
        const user = await personal.findOne({ email: req.body.email, password: hashPassword });;
        if (user && (await bcrypt.compare(  user.password )))
        if(user){
            const accessToken = jwt.sign(user.email, process.env.SECRET_TOKEN);
            // return(accessToken);
            res.json(accessToken);
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