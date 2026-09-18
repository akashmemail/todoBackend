const gettodo = require("../../models/todo.model.js");

const get = async (req, res) => {
  try {
    const user = req.user.id;
    // console.log("chaek user id ", user);

    const alldeta = await gettodo.find();
    // console.log("this is all dataform", alldeta);

    const data = await gettodo.find({ userid: user });

    // console.log("this is data of todo", data);
    // return;

    if (!data) {
      return res.status(409).json({
        success: false,
        message: "user not find",
      });
    }

    return res.status(200).json({
      success: true,
      message: "data fetch successfully",
      data: data,
    });
  } catch (error) {
    console.log("gettodo ka error h", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = get;
