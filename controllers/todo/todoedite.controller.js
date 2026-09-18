const edite = require("../../models/todo.model.js");

const editetodo = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("this id form id==", id);

    if (!id) {
      return res.status(409).json({
        success: false,
        message: "todo id not found",
      });
    }
    // return;
    const userid = req.user.id;

    if (!userid) {
      return res.status(409).json({
        success: false,
        message: "userid not found",
      });
    }
    // console.log(userid);
    // return;
    const { title, des } = req.body;

    if (!title || !des) {
      return res.status(409).json({
        success: false,
        message: "allfeald are required",
      });
    }

    const data = await edite.findByIdAndUpdate(id);
    console.log(data);

    if (!data) {
      return res.status(409).json({
        success: false,
        message: "user todo not fetch successfully",
      });
    }

    data.title = title || data.title;

    data.des = des || data.des;

    await data.save();

    return res.status(200).json({
      success: true,
      message: "todo update successfully",
      data: data,
    });
  } catch (error) {
    console.log("edite todo ka error h", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = editetodo;
