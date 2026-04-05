import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/Auth.js";

const router = express.Router();

router.post("/register",async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);

        const user=new User({name,email,password:hashedPassword});

        await user.save();

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(201).json({message:"User registered successfully",token,user:{_id:user._id,name:user.name,email:user.email}});



    }catch(error){
    res.status(500).json({message:"Error registering user",error:error.message});
    }
})

router.post("/login",async(req,res)=>{
    try{
        const {email,password}= req.body;
        const user =await User.findOne({email});
        if(!user) { return res.status(404).json({message:"User not found"});}
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){ return res.status(400).json({message:"Invalid credentials"});}

         const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
         res.json({message:"User logged in successfully",token,user:{_id:user._id,name:user.name,email:user.email}});

    }
    catch(error){
        res.status(500).json({message:"Error logging in",error:error.message});
    }
})


// ADD THIS to your routes/Users.js — before export default router
// Allows searching users by name for starting new conversations

router.get("/search", authMiddleware, async (req, res) => {
  try {
    const q = req.query.q?.trim();
    if (!q) return res.json({ users: [] });

    const users = await User.find({
      name: { $regex: q, $options: "i" }, // case-insensitive search
      _id: { $ne: req.user.id },          // exclude self
    })
      .select("name avatar email")
      .limit(10);

    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error searching users", error: error.message });
  }
});

// NOTE: this route must be placed BEFORE router.get("/:id", ...) 
// because /search would otherwise be matched as /:id = "search"


//fetching user profile
router.get("/:id",async(req,res)=>{
        try{

            const user= await User.findById(req.params.id).select("-password");
            if(!user){return res.status(404).json({message:"User not found"});}
            res.json({user});
        }catch(error){
            res.status(500).json({message:"Error fetching user",error:error.message});

        }
})

//fetching logged in user profile
router.get("/me/profile",authMiddleware,async(req,res)=>{
        try{

            const user= await User.findById(req.params.id).select("-password");
            if(!user){return res.status(404).json({message:"User not found"});}
            res.json({user});
        }catch(error){
            res.status(500).json({message:"Error fetching user",error:error.message});

        }
})

export default router;