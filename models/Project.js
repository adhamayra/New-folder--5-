/**
 * PROJECTS Collection - Learn Everything ERD
 * User creates projects (1 User → Many Projects)
 */
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    project_name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
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
  { collection: 'projects' }
);

projectSchema.index({ user_id: 1 });
projectSchema.index({ user_id: 1, created_at: -1 });

export default mongoose.model('Project', projectSchema);
