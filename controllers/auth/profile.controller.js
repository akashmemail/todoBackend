const profileform = require("../../models/user.model.js");

const profile = async (req, res) => {
  try {
    const user = req.user.id;
    // console.log(user);

    const data = await profileform.findById(user);

    // console.log(data);
    if (!data) {
      return res.status(409).json({
        success: false,
        message: "profile not fetch",
      });
    }

    return res.status(200).json({
      success: true,
      message: "user profile fetch successfully",
      data: data,
    });
  } catch (error) {
    console.log("profiel ka error h", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = profile;
