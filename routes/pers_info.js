const express = require('express');
const personal = require('../models/personal');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv/config');

router.get('/', async (req, res) => {
    try{
        const posts = await personal.find();
        res.json(posts);
   }catch(err){
       res.json( {message: err});
   }
});

router.post('/',async (req, res) => {
    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    try{
    const post = new personal({
        image: req.body.image,
        name: req.body.name,
        password: passwordHash,
        email: req.body.email,
        address: req.body.address,
        D_O_B: Date.parse(req.body.D_O_B),
        phone:req.body.phone,
    });
    const savedPost = await post.save();
        res.json(savedPost);
    } catch(err){
        res.json( {message: err});
    }
});

module.exports = router; 