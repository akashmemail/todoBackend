const delettodo = require("../../models/todo.model.js");

const delet = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("user id for delete", id);

    const data = await delettodo.findByIdAndDelete(id);
    // console.log(data);

    if (!data) {
      return res.status(409).json({
        success: false,
        message: "data not fetch successfully",
      });
    }

    return res.status(200).json({
      success: true,
      message: "data delete successfully",
      data: data,
    });
  } catch (error) {
    console.log("deletetodo ka error h", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = delet;
