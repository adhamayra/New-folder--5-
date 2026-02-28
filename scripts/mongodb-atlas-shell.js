/**
 * MongoDB Atlas Shell Commands
 * Run with: mongosh "YOUR_ATLAS_URI" < scripts/mongodb-atlas-shell.js
 * Or copy/paste into: Atlas -> Database -> Browse Collections -> mongosh
 *
 * Creates collections with JSON Schema validation (redesigned schema)
 */

db = db.getSiblingDB('learn_everything');

// ============================================
// 1. USERS Collection
// ============================================
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["full_name", "email", "password_hash", "role", "created_at"],
      properties: {
        full_name: { bsonType: "string" },
        email: { bsonType: "string" },
        password_hash: { bsonType: "string" },
        role: { enum: ["user", "admin"] },
        avatar_url: { bsonType: "string" },
        last_login_at: { bsonType: "date" },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });

// ============================================
// 2. PROJECTS Collection
// ============================================
db.createCollection("projects", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id", "project_name", "created_at"],
      properties: {
        user_id: { bsonType: "objectId" },
        project_name: { bsonType: "string" },
        description: { bsonType: "string" },
        subject: { bsonType: "string" },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});
db.projects.createIndex({ user_id: 1 });
db.projects.createIndex({ user_id: 1, created_at: -1 });

// ============================================
// 3. LEARNING_SETTINGS Collection
// ============================================
db.createCollection("learning_settings", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id"],
      properties: {
        user_id: { bsonType: "objectId" },
        subject: { bsonType: "string" },
        difficulty: { enum: ["beginner", "intermediate", "advanced"] },
        learning_style: { enum: ["visual", "auditory", "reading", "kinesthetic"] },
        ai_temperature: { bsonType: "double", minimum: 0, maximum: 1 },
        response_depth: { enum: ["brief", "moderate", "detailed"] },
        preferred_language: { bsonType: "string" },
        daily_goal_minutes: { bsonType: "int", minimum: 0 },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});
db.learning_settings.createIndex({ user_id: 1 }, { unique: true });

// ============================================
// 4. LEARNING_PROGRESS Collection
// ============================================
db.createCollection("learning_progress", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id", "last_activity"],
      properties: {
        user_id: { bsonType: "objectId" },
        topics: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              topic_name: { bsonType: "string" },
              mastery_level: { bsonType: "int", minimum: 0, maximum: 100 },
              lessons_completed: { bsonType: "int" },
              last_reviewed_at: { bsonType: "date" }
            }
          }
        },
        total_study_minutes: { bsonType: "number" },
        streak_days: { bsonType: "int" },
        last_activity: { bsonType: "date" },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});
db.learning_progress.createIndex({ user_id: 1 }, { unique: true });
db.learning_progress.createIndex({ last_activity: -1 });

// ============================================
// 5. TOPICS Collection (new)
// ============================================
db.createCollection("topics", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "created_at"],
      properties: {
        name: { bsonType: "string" },
        category: { bsonType: "string" },
        description: { bsonType: "string" },
        difficulty: { enum: ["beginner", "intermediate", "advanced"] },
        created_at: { bsonType: "date" }
      }
    }
  }
});
db.topics.createIndex({ category: 1 });
db.topics.createIndex({ name: 1 });

// ============================================
// 6. AUDIT_LOGS Collection
// ============================================
db.createCollection("audit_logs", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["admin_id", "action", "timestamp"],
      properties: {
        admin_id: { bsonType: "objectId" },
        action: { bsonType: "string" },
        resource_type: { bsonType: "string" },
        resource_id: { bsonType: "objectId" },
        details: { bsonType: "object" },
        ip_address: { bsonType: "string" },
        timestamp: { bsonType: "date" }
      }
    }
  }
});
db.audit_logs.createIndex({ admin_id: 1 });
db.audit_logs.createIndex({ timestamp: -1 });

// ============================================
// 7. CHATS Collection
// ============================================
db.createCollection("chats", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id", "project_id", "created_at"],
      properties: {
        user_id: { bsonType: "objectId" },
        project_id: { bsonType: "objectId" },
        title: { bsonType: "string" },
        messages: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["role", "content"],
            properties: {
              role: { enum: ["user", "assistant"] },
              content: { bsonType: "string" },
              created_at: { bsonType: "date" }
            }
          }
        },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});
db.chats.createIndex({ user_id: 1 });
db.chats.createIndex({ project_id: 1 });
db.chats.createIndex({ user_id: 1, project_id: 1 });
db.chats.createIndex({ created_at: -1 });
