import express from "express";
import bcrypt from "bcryptjs";
import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";
const router = express.Router();

//method to check if the username is unique
router.get("/check-username", async (req, res) => {
  let { username } = req.query; 
  username = username.toLowerCase();
  try {
    const user = await User.findOne({ username });
    if (user) {
      res.json({ isUnique: false });
    } else {
      res.json({ isUnique: true });
    }
  } catch (error) {
    res.status(500).json({ message: "Error checking username", error });
  }
});

//method to handle login request
router.post("/login", async (req, res) => {
  let { identifier, password } = req.body;
  // Check if the identifier is an email or username
  identifier = identifier.toLowerCase();
  // console.log(identifier, password);
  try {
    // Check if the identifier is an email or username
    const myUser = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    if (!myUser) {
      return res.status(404).send("User not found");
    }
    const isMatch = await bcrypt.compare(password, myUser.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }
    //Generate JWT token
    const token = jwt.sign(
      { id: myUser._id, username: myUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    // Set the token in an HTTP-only cookie
    // res.cookie;
    res.json({
      token : token,
      message: "User logged in successfully",
      user: {
        username: myUser.username,
        profileImg: myUser.profileImg,
        fullname: myUser.fullname,
        email: myUser.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("An error occurred during login");
  }
});

//method to handle register request
router.post("/register", async (req, res) => {
  let { username, fullname, email, password } = req.body;
  username = username.toLowerCase();
  email = email.toLowerCase();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    //Create a new user
    const newUser = new User({
      username: username,
      fullname: fullname,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({
      token : token,
      message: "User registered successfully!",
      user: {
        username: newUser.username,
        profileImg: newUser.profileImg,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send("Email already exists");
      return;
    } else {
      console.error(error);
      res.status(500).send("An error occurred while registering the user");
    }
  }
});

export default router;
