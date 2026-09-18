const regform = require("../../models/user.model.js");

const { hashpassword } = require("../../helper/bcrypt.js");

const nodemeller = require("nodemailer");

const {
  validationsigup,
} = require("../../validation/auth/sigup.validation.js");

const registion = async (req, res) => {
  try {
    const { fullname, email, phone, password } = req.body;

    const validaderrors = validationsigup({
      fullname,
      email,
      phone,
      password,
    });
    if (validaderrors) {
      return res.status(409).json({
        success: false,
        message: validaderrors,
      });
    }

    const phoneExist = await regform.findOne({ phone });
    if (phoneExist) {
      return res.status(409).json({
        success: false,
        message: "phone number allready Exists",
      });
    }

    const emialExist = await regform.findOne({ email });
    if (emialExist) {
      return res.status(409).json({
        success: false,
        message: "email id allerady Exists",
      });
    }

    const passwords = await hashpassword(password);

    const data = new regform({
      fullname,
      email,
      phone,
      password: passwords,
    });

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
      subject: "thanks for registion in my todo app",
      html: `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background-color: #ffffff;">
      <h2 style="color: #007bff; text-align: center;">Welcome to Todo App! 🚀</h2>
      
      <p style="font-size: 16px; color: #333;">Hello <strong>${fullname}</strong>,</p>
      
      <p style="font-size: 14px; color: #555; line-height: 1.6;">
        Thank you for joining us! Your account has been created successfully. You can now start organizing your daily tasks, setting reminders, and boosting your productivity.
      </p>

      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0;">
        <h4 style="margin: 0 0 10px 0; color: #333;">Account Details:</h4>
        <p style="margin: 5px 0; font-size: 14px;"><strong>Name:</strong> ${fullname}</p>
        <p style="margin: 5px 0; font-size: 14px;"><strong>Email:</strong> ${email}</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="http://localhost:5000/login" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; display: inline-block;">
          Login to Your Account
        </a>
      </div>

      <p style="font-size: 14px; color: #555;">What you can do next:</p>
      <ul style="color: #555; font-size: 14px; line-height: 1.6;">
        <li>Create your first Todo list.</li>
        <li>Mark tasks as completed when done.</li>
        <li>Stay organized every day!</li>
      </ul>

      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      
      <p style="font-size: 12px; color: #888; text-align: center;">
        If you didn't create this account, please ignore this email.<br>
        © 2026 Todo App. All rights reserved.
      </p>
 
      </div>`,
    };
    await transport.sendMail(mailopction);
    await data.save();

    return res.status(200).json({
      success: true,
      message: "Registion Successfully",
      data: data,
    });
  } catch (error) {
    console.log("this registion error h", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = registion;
