const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,

    required: true,
    unique: true,

    lowercase: true,
    // match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    type: String,
    required: true,

    // match: /^[6-9]\d{9}$/,
  },
  password: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("envprojet", userschema);
