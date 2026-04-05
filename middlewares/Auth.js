// import  jwt from "jsonwebtoken";

// const authMiddleware=(req,res,next)=>{
//     const token=req.header("Authorization").replace("Bearer ","");
//     if(!token){return res.status(401).json({message:"No token, authorization denied"});}

//     try{
//         const decoded=jwt.verify(token,process.env.JWT_SECRET);
//         req.user=decoded;
//         next();

//     }catch(error){
//         res.status(401).json({message:"Invalid token",error:error.message});
//     }
// }

// export default authMiddleware;

// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {

//     const authHeader = req.header("Authorization");

//     if(!authHeader){
//         return res.status(401).json({message:"No token, authorization denied"});
//     }

//     const token = authHeader.replace("Bearer ", "");

//     try{
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();

//     }catch(error){
//         res.status(401).json({message:"Invalid token", error:error.message});
//     }
// }

// export default authMiddleware;

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Support both "authorization" and "Authorization" (case-insensitive)
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Safely split on space instead of string replace
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Malformed token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};

export default authMiddleware;
