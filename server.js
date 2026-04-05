import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

import Users from "./routes/Users.js";
import Posts from './routes/Posts.js';
import Comments from './routes/Comments.js';
import Notifications from './routes/Notifications.js';
import Messages from './routes/Messages.js';
import { setIO } from './utils/socket.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/users", Users);
app.use("/posts", Posts);
app.use("/comments", Comments);
app.use("/notifications", Notifications);
app.use("/messages", Messages);

// Create HTTP server and attach Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Share io instance with routes
setIO(io);

// Map userId -> socketId so we can emit to specific users
const onlineUsers = new Map();

// Socket.IO auth middleware — verify JWT on connection
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("Authentication error"));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch {
    next(new Error("Invalid token"));
  }
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.userId}`);

  // Register user as online
  onlineUsers.set(socket.userId, socket.id);

  socket.on("disconnect", () => {
    onlineUsers.delete(socket.userId);
    console.log(`User disconnected: ${socket.userId}`);
  });
});

// Export so routes can look up a user's socket
export { onlineUsers };

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    httpServer.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
