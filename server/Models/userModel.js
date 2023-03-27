const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({   //this is a class to create object
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 120,
    },
}, { timestamps: true })

const userModel = mongoose.model("User",userSchema)
module.exports = userModel