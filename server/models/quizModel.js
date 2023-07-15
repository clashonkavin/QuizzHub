const mongoose = require("mongoose")
const Schema = mongoose.Schema


const quizschema = new Schema({
    quizname : {
        type : mongoose.SchemaTypes.String,
        required : true
    },
    descp : {
        type : mongoose.SchemaTypes.String,
        required : true
    },
    creatorsId : {
        type : mongoose.SchemaTypes.String,
        required : true
    },
    questions : {
        type : mongoose.SchemaTypes.Array,
        required : true
    },
    numberoftimestaken:{
        type: mongoose.SchemaTypes.Number,
        default:0,
    },
    takenby:{
        type:mongoose.SchemaTypes.Array,
        default:[],
    }
}, {timestamps: true})

const quiz = mongoose.model('quizz',quizschema)
module.exports = quiz;