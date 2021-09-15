const mongoose = require('mongoose');
require('./personal');

const postSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    CGPA: {
        type: Number,
        required: true
    },
    current_city: {
        type: String,
        required: true
    },
    applied_for: {
        type: String,
        required: true
    },
    working_experince: {
        type: String,
        required: true
    },
    expected_salary: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('professional', postSchema);