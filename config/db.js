const mongoose = require("mongoose");

const mongodb = async (url) => {
  try {
    await mongoose.connect(url, {
      dbName: "project_of_token",
    });
    console.log("mongoose connected");
  } catch (error) {
    console.log("mongoose error", error);
  }
};
module.exports = mongodb;
