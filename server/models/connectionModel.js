const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const connectionschema = new Schema({
  sender_id: {
    type: String,
    required: true,
  },
  sender_name: {
    type: String,
    required: true,
  },
  reciever_id: {
    type: String,
    required: true,
  },
  reciever_name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const connection = mongoose.model("conectns", connectionschema);
module.exports = connection;
