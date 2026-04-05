import express from 'express';
import Conversation from '../models/Conversation.js';
import User from '../models/User.js';
import authMiddleware from '../middlewares/Auth.js';
import { getIO } from '../utils/socket.js';
import { onlineUsers } from '../server.js';

const router = express.Router();

const emitToUser = (userId, event, data) => {
  try {
    const socketId = onlineUsers.get(userId.toString());
    if (socketId) getIO().to(socketId).emit(event, data);
  } catch {}
};

// GET /messages — all conversations for logged-in user (for sidebar list)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.id,
    })
      .populate('participants', 'name avatar')
      .sort({ updatedAt: -1 });

    // Attach unread count per conversation for this user
    const withUnread = conversations.map((conv) => {
      const unread = conv.messages.filter(
        (m) => !m.read && m.sender.toString() !== req.user.id
      ).length;
      return { ...conv.toObject(), unread };
    });

    res.json({ conversations: withUnread });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching conversations', error: error.message });
  }
});

// GET /messages/unread-count — just the total unread messages count
router.get('/unread-count', authMiddleware, async (req, res) => {
  try {
    const conversations = await Conversation.find({ participants: req.user.id });
    const total = conversations.reduce((acc, conv) => {
      return acc + conv.messages.filter(
        (m) => !m.read && m.sender.toString() !== req.user.id
      ).length;
    }, 0);
    res.json({ unreadCount: total });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching unread count', error: error.message });
  }
});

// GET /messages/:userId — get or create conversation with a specific user
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const otherUserId = req.params.userId;

    // Find existing conversation between the two users
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user.id, otherUserId] },
    }).populate('participants', 'name avatar');

    // Create if doesn't exist
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user.id, otherUserId],
        messages: [],
      });
      conversation = await conversation.populate('participants', 'name avatar');
    }

    // Mark all messages from the other user as read
    await Conversation.updateOne(
      { _id: conversation._id },
      { $set: { 'messages.$[elem].read': true } },
      { arrayFilters: [{ 'elem.sender': otherUserId, 'elem.read': false }] }
    );

    // Re-fetch with updated read status
    conversation = await Conversation.findById(conversation._id)
      .populate('participants', 'name avatar');

    res.json({ conversation });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching conversation', error: error.message });
  }
});

// POST /messages/:userId — send a message to a user
router.post('/:userId', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text?.trim()) return res.status(400).json({ message: 'Message cannot be empty' });

    const otherUserId = req.params.userId;

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user.id, otherUserId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user.id, otherUserId],
        messages: [],
      });
    }

    const newMessage = {
      sender: req.user.id,
      text: text.trim(),
      read: false,
    };

    conversation.messages.push(newMessage);
    conversation.lastMessage = {
      text: text.trim(),
      sender: req.user.id,
      createdAt: new Date(),
    };
    await conversation.save();

    // Get the saved message (last one)
    const savedMessage = conversation.messages[conversation.messages.length - 1];

    // Populate sender for the response
    const sender = await User.findById(req.user.id).select('name avatar');

    const messagePayload = {
      _id: savedMessage._id,
      sender: { _id: sender._id, name: sender.name, avatar: sender.avatar },
      text: savedMessage.text,
      read: savedMessage.read,
      createdAt: savedMessage.createdAt,
      conversationId: conversation._id,
    };

    // Emit real-time message to recipient
    emitToUser(otherUserId, 'new_message', messagePayload);

    res.status(201).json({ message: messagePayload });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
});

// PUT /messages/:userId/read — mark all messages from a user as read
router.put('/:userId/read', authMiddleware, async (req, res) => {
  try {
    await Conversation.updateOne(
      { participants: { $all: [req.user.id, req.params.userId] } },
      { $set: { 'messages.$[elem].read': true } },
      { arrayFilters: [{ 'elem.sender': req.params.userId, 'elem.read': false }] }
    );
    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking messages as read', error: error.message });
  }
});

export default router;
