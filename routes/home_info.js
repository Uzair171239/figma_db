const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await db.professionals.aggregate([
            {
                $lookup:
                {
                    from: "skills",
                    localField: "user_id",
                    foreignField: "user_id",
                    as: "skills"
                }
            }
        ]);
        res.json(posts);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

module.exports = router;