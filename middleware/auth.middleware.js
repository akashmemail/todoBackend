const jwt = require("jsonwebtoken");

const authverfy = (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(409).json({
        success: false,
        message: "Token required",
      });
    }
    const token = auth.split(/\s+/)[1];

    const dicode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = dicode;

    next();
  } catch (error) {
    console.log("jwt ka error h ", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = authverfy;
