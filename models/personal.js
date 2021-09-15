const mongoose = require('mongoose');
require('./professional');
require('./skills');

const postSchema = mongoose.Schema({
    image: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    D_O_B: {
        type: Date,
        default: Date.now,
    },
    phone: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('personal', postSchema);