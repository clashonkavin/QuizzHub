const mongoose = require("mongoose")
const Schema = mongoose.Schema


const profileschema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    quizAttempted : {
        type : mongoose.SchemaTypes.Array,
        required : false,
        default : []
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
})

const profile = mongoose.model('profile',profileschema)
module.exports = profile;