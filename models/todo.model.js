const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "envproject",

      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("todo", TodoSchema);
