import { Router } from "express";
import User from "../Models/userModel.js";
const router = Router();

// GET user details based on username from request header
router.get("/details", async (req, res) => {
  const username = req.query.username;
  try {
    const userData = await User.findOne({ username });
    // console.log(userData);
    if (userData) {
      res.json(userData); // Send user data as JSON response
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Error fetching data from database");
  }
});

router.post("/details", async (req, res) => {
  const { username, company, phone, bio, profileImg, website } = req.body;
  // console.log(profileImg);
  try {
    const isMatch = await User.findOne({ username });
    if (isMatch) {
      // Update user properties from request body
      if (profileImg !== undefined) isMatch.profileImg = req.body.profileImg;
      if (bio !== undefined && bio !== '') isMatch.bio = req.body.bio;
      if (company !== undefined && company !== '') isMatch.company = req.body.company;
      if (phone !== undefined && phone !== '') isMatch.phone = req.body.phone;
      if (website !== undefined && website !== '') isMatch.website = req.body.website;
      await isMatch.save();
      res.json({
        isMatch,
        message: "User details updated successfully",
      });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Error saving data in database");
  }
});

export default router;
