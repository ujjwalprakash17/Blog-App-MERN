import express from "express";
import User from "../Models/userModel.js"; // Ensure correct path and extension
import BlogPost from "../Models/postModel.js"; // Ensure correct path and extension

const router = express.Router();

// Method to submit a post
router.post("/create", async (req, res) => {
    const { title, content, username } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            const newPost = new BlogPost({
                title: title,
                content: content,
                author: existingUser._id
            });

            await newPost.save(); // Save the new post to the BlogPost collection
            res.send("Post created");
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(500).send("Server error");
    }
});

router.get('/allposts/:username', async (req, res) => {
    const { username } = req.params; // Extract username from URL params
    // console.log(username); // Just for debugging
    try {
        const user = await User.findOne({ username });
        if (user) {
            const posts = await BlogPost.find({ author: user._id }).sort({ updatedAt: -1 });
            res.json(posts);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(500).send("Server error");
    }
});

router.get('/viewpost/:postId', async (req, res) => {
    const { postId } = req.params; // Extract username from URL params
    try {
        const postById = await BlogPost.findOne({ _id: postId });
        if (postById) {
            res.json(postById);
        } else {
            res.status(404).send("Post Not found");
        }
    } catch (error) {
        res.status(500).send("Server error");
    }
});


router.post("/edit/:postId", async (req, res) => {
    const { postId } = req.params; // Extract username from URL params
    const { title, content} = req.body;
    // console.log(postId ); // Just for debugging
    try {
        const postById = await BlogPost.findOne({ _id: postId });
        if (postById) {
            postById.title = title;
            postById.content = content;
            await postById.save();  
            res.send("Post updated");
        } else {
            res.status(404).send("Post Not found");
        }
    } catch (error) {
        res.status(500).send("Server error");
    }
});

router.delete("/delete/:postId", async (req, res) => {
    const { postId } = req.params; // Extract username from URL params
    console.log(postId); // Just for debugging
    try {
        const postById = await BlogPost.findOneAndDelete({_id : postId});
        if (postById) {
            res.send("Post deleted");
        } else {
            res.status(404).send("Post Not found");
        }  
    } catch (error) {
        res.status(500).send("Server error");
    }
});



export default router;
