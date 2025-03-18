const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    note:{
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);