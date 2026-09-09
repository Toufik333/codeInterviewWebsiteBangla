/**
 * CTCI Study App — Storage & Cloud Sync Manager
 * Supports offline localStorage fallback and seamless MongoDB cloud synchronization.
 */

const STORAGE_KEY = "ctci_progress";
const AUTH_TOKEN_KEY = "ctci_auth_token";
const AUTH_USER_KEY = "ctci_auth_user";

const Storage = {
  // ── Default State ─────────────────────────────────────────
  _defaultProgress() {
    const chapters = {};
    if (typeof CHAPTERS !== "undefined") {
      CHAPTERS.forEach((ch) => {
        chapters[ch.id] = {
          contentRead: false,
          quizCompleted: false,
          quizScore: null,
          answers: [],
        };
      });
    }
    return {
      activeChapter: 1,
      activeView: "dashboard", // 'dashboard' | 'tracks' | 'content' | 'quiz' | 'results'
      activeTrackId: "all",
      chapters,
      streak: 1,
    };
  },

  // ── Auth Management ───────────────────────────────────────
  getToken() {
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch {
      return null;
    }
  },

  getUser() {
    try {
      const raw = localStorage.getItem(AUTH_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  setAuth(token, user) {
    try {
      if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
      if (user) localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn("Error storing auth:", e);
    }
  },

  clearAuth() {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    } catch (e) {
      console.warn("Error clearing auth:", e);
    }
  },

  isLoggedIn() {
    return Boolean(this.getToken() && this.getUser());
  },

  // ── Local Storage Methods ─────────────────────────────────
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof CHAPTERS !== "undefined") {
          CHAPTERS.forEach((ch) => {
            if (!parsed.chapters[ch.id]) {
              parsed.chapters[ch.id] = {
                contentRead: false,
                quizCompleted: false,
                quizScore: null,
                answers: [],
              };
            }
          });
        }
        if (!parsed.activeTrackId) parsed.activeTrackId = "all";
        if (!parsed.streak) parsed.streak = 1;
        return parsed;
      }
    } catch (e) {
      console.warn("Failed to load progress, resetting:", e);
    }
    return this._defaultProgress();
  },

  save(progress) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn("Failed to save progress locally:", e);
    }

    // Trigger cloud sync in the background if logged in
    if (this.isLoggedIn()) {
      this.syncToCloud(progress).catch((err) => {
        console.warn("Background cloud sync error:", err);
      });
    }
  },

  markContentRead(progress, chapterId) {
    if (!progress.chapters[chapterId]) {
      progress.chapters[chapterId] = { contentRead: false, quizCompleted: false, quizScore: null, answers: [] };
    }
    progress.chapters[chapterId].contentRead = true;
    this.save(progress);
  },

  saveQuizResult(progress, chapterId, score, answers) {
    if (!progress.chapters[chapterId]) {
      progress.chapters[chapterId] = { contentRead: false, quizCompleted: false, quizScore: null, answers: [] };
    }
    progress.chapters[chapterId].quizCompleted = true;
    progress.chapters[chapterId].quizScore = score;
    progress.chapters[chapterId].answers = answers;
    this.save(progress);
  },

  setActive(progress, chapterId, view) {
    progress.activeChapter = chapterId;
    if (view) progress.activeView = view;
    this.save(progress);
  },

  setActiveTrack(progress, trackId) {
    progress.activeTrackId = trackId;
    this.save(progress);
  },

  // ── Metrics & Calculations ────────────────────────────────
  getCompletedCount(progress) {
    if (typeof CHAPTERS === "undefined") return 0;
    return CHAPTERS.filter(
      (ch) =>
        progress.chapters[ch.id]?.contentRead &&
        progress.chapters[ch.id]?.quizCompleted
    ).length;
  },

  getCompletionPercent(progress) {
    if (typeof CHAPTERS === "undefined" || CHAPTERS.length === 0) return 0;
    return Math.round((this.getCompletedCount(progress) / CHAPTERS.length) * 100);
  },

  getTrackProgress(progress, trackId) {
    if (typeof TRACKS === "undefined") return { completed: 0, total: 0, percent: 0, chapters: [] };
    const track = TRACKS.find((t) => t.id === trackId);
    if (!track) return { completed: 0, total: 0, percent: 0, chapters: [] };

    let completed = 0;
    track.chapters.forEach((chId) => {
      const chP = progress.chapters[chId];
      if (chP && chP.contentRead && chP.quizCompleted) completed++;
    });

    const total = track.chapters.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percent, track };
  },

  getUnlockedMilestones(progress) {
    if (typeof MILESTONES === "undefined") return [];
    return MILESTONES.filter((m) => {
      try {
        return m.check(progress);
      } catch {
        return false;
      }
    });
  },

  reset() {
    localStorage.removeItem(STORAGE_KEY);
    const def = this._defaultProgress();
    if (this.isLoggedIn()) {
      this.resetCloudProgress().catch(console.warn);
    }
    return def;
  },

  // ── Cloud API Communication ───────────────────────────────
  async checkApiStatus() {
    try {
      const res = await fetch("/api/status");
      if (!res.ok) throw new Error("API returned status " + res.status);
      return await res.json();
    } catch (e) {
      return { ok: false, dbConnected: false, error: e.message };
    }
  },

  async login(email, password) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to log in");
    }

    this.setAuth(data.token, data.user);

    // Merge cloud progress into local
    if (data.user?.progress) {
      const merged = this.mergeProgress(this.load(), data.user.progress);
      this.save(merged);
      return { user: data.user, progress: merged };
    }

    return { user: data.user, progress: this.load() };
  },

  async register(name, email, password) {
    const localProgress = this.load();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        initialProgress: localProgress,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to register");
    }

    this.setAuth(data.token, data.user);
    return { user: data.user, progress: localProgress };
  },

  async syncToCloud(progress) {
    const token = this.getToken();
    if (!token) return;

    const res = await fetch("/api/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        chapters: progress.chapters,
        activeChapter: progress.activeChapter,
        activeView: progress.activeView,
        activeTrackId: progress.activeTrackId,
      }),
    });

    if (res.status === 401) {
      this.clearAuth();
      return;
    }

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "Failed to sync to cloud");
    }

    return await res.json();
  },

  async fetchFromCloud() {
    const token = this.getToken();
    if (!token) return null;

    const res = await fetch("/api/progress", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      this.clearAuth();
      return null;
    }

    if (!res.ok) return null;

    const data = await res.json();
    if (data.ok && data.progress) {
      const current = this.load();
      const merged = this.mergeProgress(current, data.progress);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    }
    return null;
  },

  async resetCloudProgress() {
    const token = this.getToken();
    if (!token) return;

    await fetch("/api/progress/reset", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Helper to merge local and cloud progress (keep best scores and completions)
  mergeProgress(local, cloud) {
    const res = { ...local };
    if (!cloud || !cloud.chapters) return res;

    const cloudChapters = cloud.chapters instanceof Map
      ? Object.fromEntries(cloud.chapters)
      : cloud.chapters;

    Object.keys(cloudChapters).forEach((chId) => {
      const c = cloudChapters[chId];
      const l = res.chapters[chId] || {
        contentRead: false,
        quizCompleted: false,
        quizScore: null,
        answers: [],
      };

      res.chapters[chId] = {
        contentRead: Boolean(l.contentRead || c.contentRead),
        quizCompleted: Boolean(l.quizCompleted || c.quizCompleted),
        quizScore: Math.max(l.quizScore || 0, c.quizScore || 0),
        answers: l.answers?.length ? l.answers : (c.answers || []),
      };
    });

    if (cloud.streak) res.streak = Math.max(res.streak || 1, cloud.streak);
    return res;
  },
};
