const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(401).send("User already exists! Please login instead.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const pfp = `https://api.dicebear.com/9.x/croodles/svg?seed=${username}`;
    await User.create({
      username: username,
      password: hashedPassword,
      userPfp: pfp,
    });
    res.status(200).send("User created successfully!");
  } catch (error) {
    console.error(error);
    res.status(401).send("Error creating user!");
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userData = await User.findOne({ username: username });
    if (!userData) {
      return res.status(401).send("Wrong username or password!");
    }
    const hash = userData.password;
    const result = await bcrypt.compare(password, hash);
    if (result) {
      const token = jwt.sign({ userId: userData._id }, process.env.JWT_KEY, {
        expiresIn: "12h",
      });
      res.status(200).json({ token, message: "Successfully logged in!" });
    } else {
      res.status(401).send("Wrong username or password!");
    }
  } catch (error) {
    console.error(error);
    res.status(401).send("Error during login!");
  }
};

const fetchUser = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await User.findById(userId);
    const userResponse = {
      userId: userId,
      username: userData.username,
      pfp: userData.userPfp,
    };
    res.status(200).json(userResponse);
  } catch (error) {
    res.status(401).send("Invalid token");
  }
};

module.exports = {
  register,
  login,
  fetchUser,
};
