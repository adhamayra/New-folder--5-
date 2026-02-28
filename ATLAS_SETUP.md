# MongoDB Atlas Setup - Required Step

## ⚠️ IP Whitelist Required

The database setup failed because **your IP address is not whitelisted** in MongoDB Atlas. Atlas blocks connections from unknown IPs for security.

### Fix: Add Your IP to Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com) and sign in
2. Select your project → **Database** (left sidebar)
3. Click **Network Access** under the Security section
4. Click **Add IP Address**
5. Choose one:
   - **Add Current IP Address** – Adds only your current IP (recommended for dev)
   - **Allow Access from Anywhere** – Use `0.0.0.0/0` (convenient but less secure)
6. Click **Confirm**

### Then Run the Setup Again

```powershell
cd "f:\New folder (5)"
node scripts/setup-collections.js
```

You should see: `✅ All collections and indexes created successfully!`

---

## 🔐 IMPORTANT: Change Your Password

You shared your MongoDB credentials in chat. **Change your Atlas password immediately:**

1. Atlas → **Database Access** (left sidebar)
2. Click your database user (`abdelrahmanyousry991_db_user`)
3. Click **Edit** → **Edit Password**
4. Set a new password and update your `.env` file

Never share credentials in chat, email, or commit them to Git.
