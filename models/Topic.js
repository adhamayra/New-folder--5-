/**
 * TOPICS Collection - Learn Everything ERD
 * Predefined topics for structured learning progress
 */
import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Topic name is required'],
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'topics' }
);

topicSchema.index({ category: 1 });
topicSchema.index({ name: 1 });

export default mongoose.model('Topic', topicSchema);
