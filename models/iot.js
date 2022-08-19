const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    "config": String, 
    "status": String, 
    "wifiSsid": String, 
    "wifiPassword": String 
});

module.exports = mongoose.model('IOT', postSchema);