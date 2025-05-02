const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
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

    console.log(user);
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
      expiresIn: "2h",
      algorithm: "HS256",
    });

    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed!" });
  }
};
