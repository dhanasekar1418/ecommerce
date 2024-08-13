const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({ Email });
    console.log(Email)
    if (!user) {
      return res.status(400).json("Invalid Email or password");
    }
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json("Invalid  Password");
    }
    const token = jwt.sign({ user_id: user.id }, "secret_token", {
      expiresIn: "1w",
    });
    return res.status(200).json({token});
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
};

exports.CreatreUser = async (req, res) => {
  const { name, Email, Password } = req.body;
  try {
    const user = new User({
      id: uuidv4(),
      name,
      Email,
      Password
    });
    await user.save();
    res.status(201).json("user Account created");
  } catch (e) {
    console.log(e);
    res.status(500).send("server error");
  }
};
