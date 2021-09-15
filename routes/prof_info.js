const express = require('express');
const { isValidObjectId } = require('mongoose');
const personal = require('../models/personal');
const professional = require('../models/professional');
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const posts = await professional.find();
        res.json(posts);
   }catch(err){
       res.json( {message: err});
   }
});

router.post('/', async (req, res, next) => {
        try{
            // if(!isValidObjectId(req.body.professional)){
            //     throw new Error('user id is not valid')
            // }
        const post = new professional({
        user_id: req.body.user_id,
        qualification: req.body.qualification,
        university: req.body.university,
        CGPA: req.body.CGPA,
        current_city: req.body.current_city,
        applied_for: req.body.applied_for,
        working_experince: req.body.working_experince,
        expected_salary: req.body.expected_salary
    });
    const savedPost = await post.save();
        res.json(savedPost);
    } catch(err){
        res.status(400).json( { message: err} );
    }
});

module.exports = router;