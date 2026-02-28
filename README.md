# Learn Everything - MongoDB Atlas Schema

Schema implementation for the **Learn Everything** project based on the ERD (Entity Relationship Diagram). Uses MongoDB's document model with references and embedded documents.

## Collections (7 total)

| Collection | Description | Key Relationships |
|------------|-------------|-------------------|
| **users** | User accounts | -> projects, learning_settings, learning_progress, chats, audit_logs |
| **projects** | User projects | user_id -> users; <- chats |
| **learning_settings** | Learning preferences | user_id -> users |
| **learning_progress** | Structured topic progress | user_id -> users |
| **topics** | Predefined topics catalog | Referenced by learning_progress |
| **audit_logs** | Admin actions | admin_id -> users |
| **chats** | Conversations with embedded messages | user_id -> users; project_id -> projects |

## Schema Overview

### users
- full_name, email, password_hash, role, avatar_url, last_login_at, created_at, updated_at

### projects
- user_id, project_name, description, subject, created_at, updated_at

### learning_settings
- user_id, subject, difficulty, learning_style (visual/auditory/reading/kinesthetic), ai_temperature, response_depth (brief/moderate/detailed), preferred_language, daily_goal_minutes, created_at, updated_at

### learning_progress
- user_id, topics (array of { topic_name, mastery_level, lessons_completed, last_reviewed_at }), total_study_minutes, streak_days, last_activity, created_at, updated_at

### topics
- name, category, description, difficulty, created_at

### audit_logs
- admin_id, action, resource_type, resource_id, details, ip_address, timestamp

### chats
- user_id, project_id, title, messages (embedded), created_at, updated_at

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MongoDB Atlas Connection

1. Get your connection string from [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database):
   - Atlas Dashboard -> **Database** -> **Connect** -> **Connect your application**
2. Create a `.env` file:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/learn_everything?retryWrites=true&w=majority
```

### 3. Create Collections & Indexes

```bash
npm run setup-db
```

This creates all 7 collections and indexes in your Atlas database. Ensure your IP is whitelisted in Atlas Network Access.

## Project Structure

```
├── config/
│   └── database.js
├── models/
│   ├── User.js
│   ├── Project.js
│   ├── LearningSetting.js
│   ├── LearningProgress.js
│   ├── AuditLog.js
│   ├── Chat.js
│   ├── Topic.js
│   └── index.js
├── scripts/
│   ├── setup-collections.js
│   └── mongodb-atlas-shell.js
├── package.json
└── README.md
```

## Usage Example

```javascript
import { connectDB } from './config/database.js';
import { User, Project, Chat } from './models/index.js';

await connectDB();

const user = await User.create({
  full_name: 'John Doe',
  email: 'john@example.com',
  password_hash: 'hashed_password_here',
  role: 'user',
});

const project = await Project.create({
  user_id: user._id,
  project_name: 'Math Basics',
  description: 'Learning calculus fundamentals',
  subject: 'Mathematics',
});

const chat = await Chat.create({
  user_id: user._id,
  project_id: project._id,
  title: 'Introduction to Derivatives',
  messages: [
    { role: 'user', content: 'Explain calculus' },
    { role: 'assistant', content: 'Calculus is...' },
  ],
});
```

## MongoDB Shell (Alternative)

If you prefer to run commands directly in Atlas or mongosh, see `scripts/mongodb-atlas-shell.js` for the equivalent MongoDB shell commands with JSON Schema validation.

## References

- [MongoDB Atlas Database](https://www.mongodb.com/products/platform/atlas-database)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
