/**
 * LEARNING_SETTINGS Collection - Learn Everything ERD
 * User configures learning preferences (1 User → 1 Learning Settings)
 */
import mongoose from 'mongoose';

const learningSettingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      unique: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    learning_style: {
      type: String,
      enum: ['visual', 'auditory', 'reading', 'kinesthetic'],
    },
    ai_temperature: {
      type: Number,
      min: 0,
      max: 1,
      default: 0.7,
    },
    response_depth: {
      type: String,
      enum: ['brief', 'moderate', 'detailed'],
    },
    preferred_language: {
      type: String,
      trim: true,
    },
    daily_goal_minutes: {
      type: Number,
      min: 0,
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
  { collection: 'learning_settings' }
);

export default mongoose.model('LearningSetting', learningSettingSchema);
