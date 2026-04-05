// import express from 'express';
// import authMiddleware from '../middlewares/Auth.js';
// import Posts from '../models/Posts.js';
// import Comments from '../models/Comments.js';

// const router = express.Router();


// //adding comment to a post

// router.post("/:postId",authMiddleware,async(req,res)=>{
//     try{
//         const post= await Posts.findById(req.params.postId);
//         if(!post){ return res.status(404).json({message:"Post not found"});}
//         const { text } = req.body;
//         const comment= new Comments({
//             text,
//             post:req.params.postId,
//             user:req.user.id
//         })
//         await comment.save();
//         const populated= await comment.populate("user","name avatar");
//         res.status(201).json({message:"Comment added successfully",comment:populated});

//     }catch(error){
//         res.status(500).json({message:"Internal server error"});
//     }
// })

// //fetching comments for a post
// router.get("/:postId",async(req,res)=>{
//     try{
//         const comments=await Comments.find({post:req.params.postId})
//         .populate("user","name avatar")
//         .populate("replies.user","name avatar")
//         .sort({createdAt:-1});
//         res.json({comments});

//     }catch(error){
//         res.status(500).json({message:"Internal server error"});

//     }
// })

// //replying to a comment
// router.post("/:commentId/reply",authMiddleware,async(req,res)=>{
//     const {text}=req.body;
//     try{
//         const comment = await Comments.findById(req.params.commentId);
//         if(!comment){ return res.status(404).json({message:"Comment not found"});}
//         comment.replies.push({
//             text,
//             user:req.user.id
//         })
//         await comment.save();
//         const populated= await comment.populate("replies.user","name avatar");
//         res.status(201).json({message:"Reply added successfully",comment:populated});
//     }catch(error){
//         res.status(500).json({message:"Internal server error",  error: error.message});
//     }

// })
// export default router;



import express from 'express';
import authMiddleware from '../middlewares/Auth.js';
import Posts from '../models/Posts.js';
import Comments from '../models/Comments.js';
import Notification from '../models/Notifications.js';
import { getIO } from '../utils/socket.js';
import { onlineUsers } from '../server.js';

const router = express.Router();

const emitNotification = (recipientId, notification) => {
  try {
    const io = getIO();
    const socketId = onlineUsers.get(recipientId.toString());
    if (socketId) {
      io.to(socketId).emit("new_notification", notification);
    }
  } catch {}
};

// Add a comment to a post
router.post("/:postId", authMiddleware, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const { text } = req.body;
    const comment = new Comments({ text, post: req.params.postId, user: req.user.id });
    await comment.save();
    const populated = await comment.populate("user", "name avatar");

    // Notify post owner — not if commenting on own post
    if (post.user.toString() !== req.user.id) {
      const notification = await Notification.create({
        recipient: post.user,
        sender: req.user.id,
        type: "comment",
        post: post._id,
      });
      const populatedNotif = await notification.populate("sender", "name avatar");
      await populatedNotif.populate("post", "text");
      emitNotification(post.user, populatedNotif);
    }

    res.status(201).json({ message: "Comment added successfully", comment: populated });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Get comments for a post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comments.find({ post: req.params.postId })
      .populate("user", "name avatar")
      .populate("replies.user", "name avatar")
      .sort({ createdAt: -1 });
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Reply to a comment
router.post("/:commentId/reply", authMiddleware, async (req, res) => {
  const { text } = req.body;
  try {
    const comment = await Comments.findById(req.params.commentId).populate("user", "_id name");
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.replies.push({ text, user: req.user.id });
    await comment.save();
    const populated = await comment.populate("replies.user", "name avatar");

    // Notify comment author — not if replying to own comment
    if (comment.user._id.toString() !== req.user.id) {
      const notification = await Notification.create({
        recipient: comment.user._id,
        sender: req.user.id,
        type: "reply",
        post: comment.post,
      });
      const populatedNotif = await notification.populate("sender", "name avatar");
      await populatedNotif.populate("post", "text");
      emitNotification(comment.user._id, populatedNotif);
    }

    res.status(201).json({ message: "Reply added successfully", comment: populated });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

export default router;
