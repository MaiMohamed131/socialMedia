// import express from "express";
// import Posts from "../models/Posts.js"
// import authMiddleware from "../middlewares/Auth.js";
// import cloudinary from "../utils/cloudinary.js"
// const router = express.Router();

// //creating a post
// router.post("/",authMiddleware,async(req,res)=>{
//     try{
//         const {text,image}=req.body; 
//         let imageUrl=null; 
//         if(image){
//             const result= await cloudinary.uploader.upload(image,
//                 {
//                     folder:"posts"
//                 })
//             imageUrl=result.secure_url; // Save the image URL in the database

//         }
//         const post= new Posts({user:req.user.id,
//             text,
//             image:imageUrl});
//         await post.save();
//         res.status(201).json({message:"Post created successfully",post});

//     }catch(error){
//         res.status(500).json({message:"Error creating post",error:error.message});
//     }

// })

// router.get("/",async(req,res)=>{
//     try{
//         const posts=await Posts.find().populate("user","name email avatar").populate("likes").sort({createdAt:-1});
//         res.json({posts});


//     }catch(error){
//         res.status(500).json({message:"Error fetching posts",error:error.message});

//     }
// })


// router.put("/:id",authMiddleware,async(req,res)=>{
//     try{
//         const post= await Posts.findById(req.params.id);
//         if(post.user.toString()!== req.user.id){
//             return res. status(403).json({message:"Unauthorized"});
//         }

//         post.text= req.body.text || post.text;
//         post.image=req.body.image || post.image;
//         post.save();
//         res.json({message:"Post updated successfully",post});

//     }catch(error){
//         res.status(500).json({message:"Error updating post",error:error.message});
//     }
// })

// router.delete("/:id",authMiddleware,async(req,res)=>{
//     try{
//         const post=await Posts.findById(req.params.id);
//         if(post.user.toString()!== req.user.id){
//             return res.status(403).json({message:"Unauthorized"});
//         }
//         await post.deleteOne();
//         res.json({message:"Post deleted successfully"});

//     }catch(error){
//     res.status(500).json({message:"Error deleting post",error:error.message});}
// })


// router.put("/:id/like", authMiddleware, async (req, res) => {
//   try {
//     const post = await Posts.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: "Post not found" });

//     const alreadyLiked = post.likes.includes(req.user.id);

//     if (alreadyLiked) {
//       // Unlike — remove user id from likes array
//       post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
//     } else {
//       // Like — add user id
//       post.likes.push(req.user.id);
//     }

//     await post.save();
//     res.json({ likes: post.likes, liked: !alreadyLiked });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating like", error: error.message });
//   }
// });




// export default router;

import express from "express";
import Posts from "../models/Posts.js";
import Notification from "../models/Notifications.js";
import authMiddleware from "../middlewares/Auth.js";
import cloudinary from "../utils/cloudinary.js";
import { getIO } from "../utils/socket.js";
import { onlineUsers } from "../server.js";

const router = express.Router();

// Helper — emit notification to a user if they're online
const emitNotification = (recipientId, notification) => {
  try {
    const io = getIO();
    const socketId = onlineUsers.get(recipientId.toString());
    if (socketId) {
      io.to(socketId).emit("new_notification", notification);
    }
  } catch {}
};

// Create a post
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { text, image } = req.body;
    let imageUrl = null;
    if (image) {
      const result = await cloudinary.uploader.upload(image, { folder: "posts" });
      imageUrl = result.secure_url;
    }
    const post = new Posts({ user: req.user.id, text, image: imageUrl });
    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error: error.message });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find()
      .populate("user", "name email avatar")
      .populate("likes")
      .sort({ createdAt: -1 });
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
});

// Update a post
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    post.text = req.body.text || post.text;
    post.image = req.body.image || post.image;
    await post.save();
    res.json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error: error.message });
  }
});

// Delete a post
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error: error.message });
  }
});

// Like / Unlike a post
router.put("/:id/like", authMiddleware, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.includes(req.user.id);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
      await Notification.findOneAndDelete({
        recipient: post.user,
        sender: req.user.id,
        type: "like",
        post: post._id,
      });
    } else {
      post.likes.push(req.user.id);

      // Only notify if liker is not the post owner
      if (post.user.toString() !== req.user.id) {
        const notification = await Notification.create({
          recipient: post.user,
          sender: req.user.id,
          type: "like",
          post: post._id,
        });

        // Populate sender info before emitting
        const populated = await notification.populate("sender", "name avatar");
        await populated.populate("post", "text");
        emitNotification(post.user, populated);
      }
    }

    await post.save();
    res.json({ likes: post.likes, liked: !alreadyLiked });
  } catch (error) {
    res.status(500).json({ message: "Error updating like", error: error.message });
  }
});

export default router;
