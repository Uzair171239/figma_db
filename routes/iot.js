const express = require('express');
const iot = require('../models/iot');
const router = express.Router();

router.post('/',async (req, res) => {
    try{
        const post = new iot(req.body);
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err){
        res.json( {message: err});
    }
});

module.exports = router; 