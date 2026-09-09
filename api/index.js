const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "ctci-super-secret-key-2026-safe-default";

// ── Database Connection with Serverless Caching ───────────
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return { connected: false, error: "MONGODB_URI is not defined in environment variables" };
  }

  if (cached.conn) {
    return { connected: true, conn: cached.conn };
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      tlsAllowInvalidCertificates: true,
      dbName: "ctci_db",
    };
    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
    return { connected: true, conn: cached.conn };
  } catch (e) {
    cached.promise = null;
    return { connected: false, error: e.message };
  }
}

// ── Auth Middleware ───────────────────────────────────────
async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ ok: false, error: "AUTH_REQUIRED", message: "Authorization token required" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, error: "INVALID_TOKEN", message: "Token expired or invalid" });
  }
}

// Helper to calculate / update streaks
function calculateStreak(user) {
  const now = new Date();
  const lastActive = user.progress?.lastActiveDate ? new Date(user.progress.lastActiveDate) : null;
  
  if (!lastActive) {
    return 1;
  }

  const diffMs = now.setHours(0, 0, 0, 0) - lastActive.setHours(0, 0, 0, 0);
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return (user.progress.streak || 0) + 1;
  } else if (diffDays === 0) {
    return user.progress.streak || 1;
  } else {
    // missed a day
    return 1;
  }
}

// ── Status Route ──────────────────────────────────────────
app.get("/api/status", async (req, res) => {
  const db = await connectToDatabase();
  res.json({
    ok: true,
    service: "CTCI Prep API",
    dbConnected: db.connected,
    mongoConfigured: Boolean(process.env.MONGODB_URI),
    error: db.error || null,
    timestamp: new Date().toISOString()
  });
});

// ── Auth: Register ────────────────────────────────────────
app.post("/api/auth/register", async (req, res) => {
  const db = await connectToDatabase();
  if (!db.connected) {
    const errorMsg = !process.env.MONGODB_URI
      ? "Database not connected. Please configure MONGODB_URI in your environment variables."
      : "Could not connect to MongoDB Atlas cluster. Your IP is likely not whitelisted. In MongoDB Atlas, go to Network Access -> Add IP Address (add 0.0.0.0/0 or your current IP).";
    return res.status(503).json({
      ok: false,
      error: "DB_NOT_CONNECTED",
      message: errorMsg,
      detail: db.error
    });
  }

  try {
    const { name, email, password, initialProgress } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ ok: false, error: "VALIDATION_ERROR", message: "Name, email, and password are required." });
    }

    if (password.length < 6) {
      return res.status(400).json({ ok: false, error: "VALIDATION_ERROR", message: "Password must be at least 6 characters." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ ok: false, error: "USER_EXISTS", message: "An account with this email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // If initialProgress was passed from guest localStorage, merge it
    const progressData = {
      activeChapter: initialProgress?.activeChapter || 1,
      activeView: initialProgress?.activeView || "dashboard",
      activeTrackId: initialProgress?.activeTrackId || "all",
      chapters: initialProgress?.chapters || {},
      streak: 1,
      lastActiveDate: new Date()
    };

    const newUser = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      progress: progressData
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: "30d" });

    res.status(201).json({
      ok: true,
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        progress: newUser.progress
      }
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ ok: false, error: "SERVER_ERROR", message: "Registration failed: " + err.message });
  }
});

// ── Auth: Login ───────────────────────────────────────────
app.post("/api/auth/login", async (req, res) => {
  const db = await connectToDatabase();
  if (!db.connected) {
    const errorMsg = !process.env.MONGODB_URI
      ? "Database not connected. Please configure MONGODB_URI in your environment variables."
      : "Could not connect to MongoDB Atlas cluster. Your IP is likely not whitelisted. In MongoDB Atlas, go to Network Access -> Add IP Address (add 0.0.0.0/0 or your current IP).";
    return res.status(503).json({
      ok: false,
      error: "DB_NOT_CONNECTED",
      message: errorMsg,
      detail: db.error
    });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "VALIDATION_ERROR", message: "Email and password are required." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ ok: false, error: "INVALID_CREDENTIALS", message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ ok: false, error: "INVALID_CREDENTIALS", message: "Invalid email or password." });
    }

    // Update streak
    const newStreak = calculateStreak(user);
    user.progress.streak = newStreak;
    user.progress.lastActiveDate = new Date();
    await user.save();

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "30d" });

    res.json({
      ok: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        progress: user.progress
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ ok: false, error: "SERVER_ERROR", message: "Login failed: " + err.message });
  }
});

// ── Auth: Current User ────────────────────────────────────
app.get("/api/auth/me", requireAuth, async (req, res) => {
  const db = await connectToDatabase();
  if (!db.connected) {
    return res.status(503).json({ ok: false, error: "DB_NOT_CONNECTED", message: "Database not connected." });
  }

  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ ok: false, error: "NOT_FOUND", message: "User not found." });
    }

    res.json({
      ok: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        progress: user.progress
      }
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: "SERVER_ERROR", message: err.message });
  }
});

// ── Progress: Get ─────────────────────────────────────────
app.get("/api/progress", requireAuth, async (req, res) => {
  const db = await connectToDatabase();
  if (!db.connected) {
    return res.status(503).json({ ok: false, error: "DB_NOT_CONNECTED", message: "Database not connected." });
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ ok: false, error: "NOT_FOUND", message: "User not found." });
    }

    res.json({ ok: true, progress: user.progress });
  } catch (err) {
    res.status(500).json({ ok: false, error: "SERVER_ERROR", message: err.message });
  }
});

// ── Progress: Sync / Update ───────────────────────────────
app.post("/api/progress", requireAuth, async (req, res) => {
  const db = await connectToDatabase();
  if (!db.connected) {
    return res.status(503).json({ ok: false, error: "DB_NOT_CONNECTED", message: "Database not connected." });
  }

  try {
    const { chapters, activeChapter, activeView, activeTrackId } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ ok: false, error: "NOT_FOUND", message: "User not found." });
    }

    if (chapters) {
      // Merge chapters
      for (const [key, val] of Object.entries(chapters)) {
        user.progress.chapters.set(key, val);
      }
    }

    if (activeChapter !== undefined) user.progress.activeChapter = activeChapter;
    if (activeView !== undefined) user.progress.activeView = activeView;
    if (activeTrackId !== undefined) user.progress.activeTrackId = activeTrackId;

    user.progress.streak = calculateStreak(user);
    user.progress.lastActiveDate = new Date();

    await user.save();

    res.json({ ok: true, progress: user.progress });
  } catch (err) {
    console.error("Progress save error:", err);
    res.status(500).json({ ok: false, error: "SERVER_ERROR", message: err.message });
  }
});

// ── Progress: Reset ───────────────────────────────────────
app.post("/api/progress/reset", requireAuth, async (req, res) => {
  const db = await connectToDatabase();
  if (!db.connected) {
    return res.status(503).json({ ok: false, error: "DB_NOT_CONNECTED", message: "Database not connected." });
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ ok: false, error: "NOT_FOUND", message: "User not found." });
    }

    user.progress.chapters = {};
    user.progress.activeChapter = 1;
    user.progress.activeView = "dashboard";
    user.progress.lastActiveDate = new Date();
    await user.save();

    res.json({ ok: true, message: "Progress reset successfully", progress: user.progress });
  } catch (err) {
    res.status(500).json({ ok: false, error: "SERVER_ERROR", message: err.message });
  }
});

// Export express app as handler for Vercel Serverless Function
module.exports = app;
