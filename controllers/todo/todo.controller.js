const todoform = require("../../models/todo.model.js");

const todo = async (req, res) => {
  try {
    const user = req.user.id;
    if (!user) {
      return res.status(409).json({
        message: "user not found",
      });
    }
    const { title, des } = req.body;
    // console.log(title, des);

    if (!title || !des) {
      return res.status(409).json({
        success: false,
        message: "allfield are required",
      });
    }

    const data = new todoform({
      userid: user,
      title: title,
      des: des,
    });
    await data.save();

    return res.status(200).json({
      success: true,
      message: "Todo add successfully",
      data: data,
    });
  } catch (error) {
    console.log("todo error h", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = todo;
