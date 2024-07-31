import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImg: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png",
  },
  phone: { type: String },
  company: { type: String },
  website: { type: String },
  bio: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema, "userInfo");

export default User;
