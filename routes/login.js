const express = require('express');
const personal = require('../models/personal');
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const posts = await personal.find();
        res.json(posts);
   }catch(err){
       res.json( {message: err});
   }
});

router.post('/',async (req, res) => {
    try{
    const post = new personal({
        email: req.body.email,
        password: req.body.password
    });
    const savedPost = await post.save();
        res.json(savedPost);
    } catch(err){
        res.json( {message: err});
    }
});

module.exports = router;