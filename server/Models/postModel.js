import mongoose from "mongoose";
import { Schema } from "mongoose";
import User from "./userModel.js";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  images: [{ type: String }], // Array of image URLs
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const BlogPost = mongoose.model('BlogPost', postSchema, 'blogPosts');

export default BlogPost;
