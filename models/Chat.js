/**
 * CHATS Collection - Learn Everything ERD
 * User owns chats within projects (1 User → Many Chats, 1 Project → Many Chats)
 * messages: embedded documents for conversation history
 */
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const chatSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project reference is required'],
    },
    title: {
      type: String,
      trim: true,
    },
    messages: [messageSchema],
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'chats' }
);

chatSchema.index({ user_id: 1 });
chatSchema.index({ project_id: 1 });
chatSchema.index({ user_id: 1, project_id: 1 });
chatSchema.index({ created_at: -1 });

export default mongoose.model('Chat', chatSchema);
