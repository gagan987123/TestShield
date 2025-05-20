const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.foget_pass = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "user not found" });
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const resetlink = `http://localhost:5173/reset-password/${token}`;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Link (TestShield)",
      html: `<h1>Reset Your Password</h1><p>Click <a href="${resetlink}">here</a> to reset your password. This link will expire in 15 minutes.</p>`,
    });
    console.log("Email sent successfully");
    res
      .status(200)
      .json({ message: "Password reset link sent to email", link: resetlink });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};
exports.reset_pass = async (req, res) => {
  const { newPassword } = req.body;
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json({ message: "Password has been updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid or expired token." });
  }
};
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists 😒" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered success 😍" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "User registration failed 😢",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found!" });

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch)
      return res.status(400).json({ error: "Invalid credentials! 🙄" });

    const userObj = user.toObject();
    const { base64Image, ...userWithoutImage } = userObj;

    const token = jwt.sign({ user: userWithoutImage }, process.env.JWT_SECRET, {
      expiresIn: "2h",
      algorithm: "HS256",
    });

    const userWithBase64Image = {
      ...userWithoutImage,
      base64Image: base64Image,
    };
    res.status(200).json({ token, user: userWithBase64Image });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed!" });
  }
};

exports.authCheck = (req, res) => {
  try {
    return res.status(200).json({ success: true, user: req.allUserdetails });
  } catch (error) {
    console.log("erorr in  authCheck controoller", error.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};
exports.uploadfile = async (req, res) => {
  try {
    const { base64Image } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { base64Image },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Image uploaded", image: user.base64Image });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
};
