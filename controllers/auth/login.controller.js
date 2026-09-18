const loginform = require("../../models/user.model.js");
const { comparepassword } = require("../../helper/bcrypt.js");
const jwt = require("jsonwebtoken");
const nodemeller = require("nodemailer");

const {
  validationlogin,
} = require("../../validation/auth/login.validation.js");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validaterror = validationlogin({ email, password });

    if (validaterror) {
      return res.status(409).json({
        success: false,
        message: validaterror,
      });
    }

    const data = await loginform.findOne({ email });
    if (!data) {
      return res.status(409).json({
        success: false,
        message: "user data not found",
      });
    }

    const Ismath = await comparepassword(password, data.password);

    if (!Ismath) {
      return res.status(409).json({
        success: false,
        message: "email & password not match",
      });
    }

    const token = jwt.sign(
      {
        id: data._id,
        email: data.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8d",
      },
    );

    const transport = nodemeller.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailopction = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "thanks for login in my todo app",
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background-color: #ffffff;">
      <h2 style="color: #28a745; text-align: center;">Successful Login Alert</h2>
      
      <p style="font-size: 16px; color: #333;">Hello <strong>${email}</strong>,</p>
      
      <p style="font-size: 14px; color: #555; line-height: 1.6;">
        We detected a successful login to your <strong>Todo App</strong> account.
      </p>

      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #007bff;">
        <h4 style="margin: 0 0 10px 0; color: #333;">Login Details:</h4>
        <p style="margin: 5px 0; font-size: 14px;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p style="margin: 5px 0; font-size: 14px;"><strong>Account:</strong> ${email}</p>
      </div>

      <div style="background-color: #fff3cd; border: 1px solid #ffeeba; color: #856404; padding: 12px; border-radius: 6px; font-size: 13px; margin-bottom: 20px;">
        <strong>Didn't log in?</strong> If this wasn't you, please reset your password immediately or contact our support team to secure your account.
      </div>

      <div style="text-align: center; margin: 25px 0;">
        <a href="http://localhost:5000/profile" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 15px; display: inline-block;">
          Go to Dashboard
        </a>
      </div>

      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      
      <p style="font-size: 12px; color: #888; text-align: center;">
        This is an automated security notification. Please do not reply directly to this email.<br>
        © 2026 Todo App. All rights reserved.
      </p>
    </div>`,
    };
    await transport.sendMail(mailopction);

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      data: data,
      token: token,
    });
  } catch (error) {
    console.log("login ka error h", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = login;
