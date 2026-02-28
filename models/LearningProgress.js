/**
 * LEARNING_PROGRESS Collection - Learn Everything ERD
 * Tracks user's learning progress (1 User → 1 Learning Progress)
 */
import mongoose from 'mongoose';

const topicProgressSchema = new mongoose.Schema(
  {
    topic_name: {
      type: String,
      required: true,
      trim: true,
    },
    mastery_level: {
      type: Number,
      min: 0,
      max: 100,
    },
    lessons_completed: {
      type: Number,
      default: 0,
    },
    last_reviewed_at: {
      type: Date,
    },
  },
  { _id: false }
);

const learningProgressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      unique: true,
    },
    topics: [topicProgressSchema],
    total_study_minutes: {
      type: Number,
      default: 0,
    },
    streak_days: {
      type: Number,
      default: 0,
    },
    last_activity: {
      type: Date,
      default: Date.now,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'learning_progress' }
);

learningProgressSchema.index({ last_activity: -1 });

export default mongoose.model('LearningProgress', learningProgressSchema);
