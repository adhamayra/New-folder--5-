/**
 * MongoDB Atlas Collection Setup Script
 * Run: node scripts/setup-collections.js
 * Creates collections and indexes in your Atlas database
 */
import 'dotenv/config';
import { connectDB } from '../config/database.js';
import {
  User,
  Project,
  LearningSetting,
  LearningProgress,
  AuditLog,
  Chat,
  Topic,
} from '../models/index.js';

async function setupCollections() {
  try {
    await connectDB();

    // Sync indexes for all models (creates collections if they don't exist)
    await User.init();
    await Project.init();
    await LearningSetting.init();
    await LearningProgress.init();
    await AuditLog.init();
    await Chat.init();
    await Topic.init();

    console.log('All collections and indexes created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

setupCollections();
