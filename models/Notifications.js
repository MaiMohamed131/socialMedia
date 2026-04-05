import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['comment', 'like', 'reply', 'message'],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Posts', // ← matches mongoose.model("Posts", ...) in your Posts.js model
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt + updatedAt auto-managed by Mongoose
  }
);

export default mongoose.model('Notification', notificationSchema);
