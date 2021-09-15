const express = require('express');
// const { isValidObjectId } = require('mongoose');
const personal = require('../models/personal');
const router = express.Router();
const skills = require('../models/skills');

router.get('/', async (req, res) => {
    try {
        const posts = await skills.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    try {
    //     if(!isValidObjectId(req.body.skills)){
    //         throw new Error('user id is not valid')
    //     }
    const post = new skills({
        user_id: req.body.user_id,
        name: req.body.name,
        level: req.body.level,
        language: req.body.language
    });
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;