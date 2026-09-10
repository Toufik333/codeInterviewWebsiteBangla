/**
 * CTCI Prep — Track-Based Learning Application Controller
 * Minimalist Dark Edition — Linear / Raycast Aesthetic
 * Manages SPA routing, Learning Tracks roadmap, Auth modals, Quiz engine, and Cloud Sync.
 */

(function () {
  "use strict";

  // ── State ────────────────────────────────────────────────
  let progress = Storage.load();
  let currentQuizIndex = 0;
  let currentQuizAnswers = [];
  let quizSubmitted = false;
  let sidebarOpen = false;
  let userMenuOpen = false;
  let dashboardMode = "tracks"; // 'tracks' | 'grid'
  let selectedTrackFilter = "all";
  let activeChapterTab = "concepts"; // 'concepts' | 'problems'
  let dbStatus = { checked: false, connected: false, mongoConfigured: false };
  let dbBannerDismissed = false;

  const app = document.getElementById("app");
  const modalContainer = document.getElementById("modalContainer");
  const toastContainer = document.getElementById("toastContainer");

  // ── Toast Notification Helper ─────────────────────────────
  function showToast(message, type = "info", duration = 4000) {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast-message ${type}`;

    let icon = "ℹ️";
    if (type === "success") icon = "✓";
    if (type === "warning") icon = "⚠️";
    if (type === "error") icon = "✕";

    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(40px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // ── Init ─────────────────────────────────────────────────
  async function init() {
    render();

    // Check backend and database status
    Storage.checkApiStatus()
      .then((status) => {
        dbStatus = {
          checked: true,
          connected: Boolean(status.dbConnected),
          mongoConfigured: Boolean(status.mongoConfigured),
          error: status.error,
        };
        // If logged in, attempt to fetch fresh cloud progress
        if (Storage.isLoggedIn()) {
          Storage.fetchFromCloud().then((cloudProg) => {
            if (cloudProg) {
              progress = cloudProg;
              render();
            }
          });
        }
        render();
      })
      .catch(() => {
        dbStatus = { checked: true, connected: false, mongoConfigured: false };
        render();
      });

    window.addEventListener("popstate", () => {
      render();
    });

    // Close user dropdown if clicking outside
    document.addEventListener("click", (e) => {
      if (userMenuOpen && !e.target.closest("#userProfileBtn") && !e.target.closest("#userDropdownMenu")) {
        userMenuOpen = false;
        const menu = document.getElementById("userDropdownMenu");
        if (menu) menu.remove();
      }
    });
  }

  // ── Router / Main Render ─────────────────────────────────
  function render() {
    const appContainer = document.getElementById("app");
    if (!appContainer) return;

    try {
      const view = progress.activeView || "dashboard";
      const chId = progress.activeChapter;

      let pageHTML = "";

      switch (view) {
        case "content":
          pageHTML = renderContentView(chId);
          break;
        case "quiz":
          pageHTML = renderQuizView(chId);
          break;
        case "results":
          pageHTML = renderResultsView(chId);
          break;
        default:
          pageHTML = renderDashboard();
      }

      appContainer.innerHTML = `
        <div class="sidebar-overlay" id="sidebarOverlay"></div>
        ${renderSidebar()}
        <div class="main-content">
          ${renderTopBar(view, chId)}
          <div class="page-container">
            ${pageHTML}
          </div>
        </div>
      `;

      attachEvents();
      applyStaggerAnimation();
    } catch (err) {
      console.error("Rendering error:", err);
      appContainer.innerHTML = `
        <div style="min-height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; color: #FAFAFA; text-align: center;">
          <h2 style="color: #EF4444; font-size: 1.5rem; margin-bottom: 0.5rem;">Rendering Notice</h2>
          <p style="color: #A1A1AA; max-width: 500px; margin-bottom: 1.5rem;">${err.message || "An error occurred while rendering the page."}</p>
          <button onclick="localStorage.clear(); window.location.reload();" style="padding: 0.6rem 1.25rem; background: #F59E0B; color: #0A0A0F; font-weight: 600; border: none; border-radius: 8px; cursor: pointer;">
            Reset Cache & Reload
          </button>
        </div>
      `;
    }
  }

  // ── Sidebar ──────────────────────────────────────────────
  function renderSidebar() {
    const completed = Storage.getCompletedCount(progress);
    const total = CHAPTERS.length;
    const pct = Storage.getCompletionPercent(progress);

    let chaptersHTML = CHAPTERS.map((ch) => {
      const chProg = progress.chapters[ch.id] || {};
      const isActive = progress.activeChapter === ch.id && progress.activeView !== "dashboard";

      let statusText = "Not started";
      let badgeClass = "badge-locked";
      let badgeIcon = "○";

      if (chProg.quizCompleted) {
        statusText = `Score: ${chProg.quizScore}/5`;
        badgeClass = "badge-completed";
        badgeIcon = "✓";
      } else if (chProg.contentRead) {
        statusText = "Quiz ready";
        badgeClass = "badge-in-progress";
        badgeIcon = "▸";
      }

      return `
        <div class="chapter-nav-item ${isActive ? "active" : ""}" data-chapter="${ch.id}">
          <div class="chapter-nav-icon">${ch.icon}</div>
          <div class="chapter-nav-info">
            <div class="chapter-nav-name">${ch.title}</div>
            <div class="chapter-nav-status">${statusText}</div>
          </div>
          <div class="chapter-nav-badge ${badgeClass}">${badgeIcon}</div>
        </div>
      `;
    }).join("");

    return `
      <aside class="sidebar ${sidebarOpen ? "open" : ""}" id="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-brand" id="goHome" role="button" tabindex="0" aria-label="Go to Dashboard">
            <div class="sidebar-logo">🧠</div>
            <div>
              <div class="sidebar-title">CTCI Prep</div>
              <div class="sidebar-subtitle">Minimalist Dark Edition</div>
            </div>
          </div>
        </div>
        <div class="sidebar-progress">
          <div class="progress-label">
            <span>MASTERY</span>
            <span>${completed}/${total} (${pct}%)</span>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill" style="width: ${pct}%"></div>
          </div>
        </div>
        <div class="sidebar-chapters">
          <div class="sidebar-section-label">Study Modules</div>
          ${chaptersHTML}
        </div>
        <div class="sidebar-footer">
          <button class="btn-reset" id="btnReset">↺ Reset All Progress</button>
        </div>
      </aside>
    `;
  }

  // ── Top Bar with Auth & Sync Status ──────────────────────
  function renderTopBar(view, chId) {
    let breadcrumbs = `<span class="breadcrumb-link" data-nav="dashboard">Dashboard</span>`;

    if (view !== "dashboard" && chId) {
      const ch = CHAPTERS.find((c) => c.id === chId);
      if (ch) {
        breadcrumbs += `<span class="breadcrumb-sep">/</span>`;
        if (view === "content") {
          breadcrumbs += `<span class="breadcrumb-current">${ch.title}</span>`;
        } else if (view === "quiz") {
          breadcrumbs += `<span class="breadcrumb-link" data-nav="content" data-chapter="${chId}">${ch.title}</span>`;
          breadcrumbs += `<span class="breadcrumb-sep">/</span>`;
          breadcrumbs += `<span class="breadcrumb-current">Quiz</span>`;
        } else if (view === "results") {
          breadcrumbs += `<span class="breadcrumb-link" data-nav="content" data-chapter="${chId}">${ch.title}</span>`;
          breadcrumbs += `<span class="breadcrumb-sep">/</span>`;
          breadcrumbs += `<span class="breadcrumb-current">Results</span>`;
        }
      }
    }

    const user = Storage.getUser();
    let authControlsHTML = "";

    if (user) {
      const initials = user.name
        ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : "U";
      const syncText = dbStatus.connected ? "Synced" : "Local";
      const syncClass = dbStatus.connected ? "" : "local";

      authControlsHTML = `
        <div class="top-bar-right" style="position: relative;">
          <button class="user-profile-btn" id="userProfileBtn">
            <div class="user-avatar-circle">${initials}</div>
            <span class="user-name-label">${user.name}</span>
            <span class="user-sync-pill ${syncClass}">${syncText}</span>
            <span style="font-size: 10px; color: var(--fg-muted);">▼</span>
          </button>
          ${userMenuOpen ? renderUserDropdown(user) : ""}
        </div>
      `;
    } else {
      authControlsHTML = `
        <div class="top-bar-right">
          <button class="btn-auth-trigger" id="btnOpenAuth">
            <span>👤</span>
            <span>Sign In / Register</span>
          </button>
        </div>
      `;
    }

    return `
      <header class="top-bar">
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle Navigation">☰</button>
        <nav class="breadcrumb">${breadcrumbs}</nav>
        ${authControlsHTML}
      </header>
    `;
  }

  // ── User Dropdown Menu ────────────────────────────────────
  function renderUserDropdown(user) {
    const unlockedBadges = Storage.getUnlockedMilestones(progress);
    const streak = progress.streak || 1;

    return `
      <div class="user-dropdown-menu" id="userDropdownMenu">
        <div class="dropdown-header">
          <div class="dropdown-user-name">${user.name}</div>
          <div class="dropdown-user-email">${user.email}</div>
        </div>
        <div class="dropdown-streak-pill">
          <span>🔥</span>
          <span>STREAK: ${streak} DAY${streak > 1 ? "S" : ""}</span>
        </div>
        <button class="dropdown-item" id="btnViewBadges">
          <span>🏆</span>
          <span>Milestones (${unlockedBadges.length}/${MILESTONES.length})</span>
        </button>
        <button class="dropdown-item" id="btnSyncNow">
          <span>☁️</span>
          <span>Force Cloud Sync</span>
        </button>
        <button class="dropdown-item danger" id="btnLogout">
          <span>🚪</span>
          <span>Sign Out</span>
        </button>
      </div>
    `;
  }

  // ── Dashboard View ───────────────────────────────────────
  function renderDashboard() {
    const completed = Storage.getCompletedCount(progress);
    const total = CHAPTERS.length;
    const totalQuestions = CHAPTERS.reduce((sum, ch) => sum + ch.quiz.length, 0);
    const answeredCorrect = CHAPTERS.reduce((sum, ch) => {
      const p = progress.chapters[ch.id] || {};
      return sum + (p.quizScore || 0);
    }, 0);
    const unlockedBadges = Storage.getUnlockedMilestones(progress);
    const streak = progress.streak || 1;

    // Database alert banner if MONGODB_URI not configured
    let dbBannerHTML = "";
    if (dbStatus.checked && !dbStatus.connected && !dbBannerDismissed) {
      dbBannerHTML = `
        <div class="db-alert-banner" id="dbAlertBanner">
          <div class="db-alert-content">
            <span>💡</span>
            <div>
              <strong>Local Mode Active:</strong> All chapter and quiz progress is saved safely in your browser.
              To enable multi-device cloud synchronization, connect MongoDB by adding <code>MONGODB_URI</code> to your <code>.env</code> file or Vercel Environment Variables.
            </div>
          </div>
          <button class="db-alert-btn" id="btnDismissDbBanner">Got it ✕</button>
        </div>
      `;
    }

    // View Switcher Bar
    const viewToggleBarHTML = `
      <div class="view-toggle-bar">
        <div class="view-toggle-group">
          <button class="view-toggle-btn ${dashboardMode === "tracks" ? "active" : ""}" data-mode="tracks">
            <span>🗺️</span>
            <span>Learning Tracks Roadmap</span>
          </button>
          <button class="view-toggle-btn ${dashboardMode === "grid" ? "active" : ""}" data-mode="grid">
            <span>▦</span>
            <span>All Chapters Grid</span>
          </button>
        </div>

        ${
          dashboardMode === "tracks"
            ? `
          <div class="track-filter-chips">
            <button class="filter-chip ${selectedTrackFilter === "all" ? "active" : ""}" data-filter="all">All Tracks</button>
            ${TRACKS.map(
              (t) => `
              <button class="filter-chip ${selectedTrackFilter === t.id ? "active" : ""}" data-filter="${t.id}">${t.shortTitle}</button>
            `
            ).join("")}
          </div>
        `
            : ""
        }
      </div>
    `;

    let mainDashboardContent = "";
    if (dashboardMode === "tracks") {
      mainDashboardContent = renderTracksRoadmap();
    } else {
      mainDashboardContent = renderChaptersGrid();
    }

    return `
      <div class="dashboard-hero">
        <div class="hero-badge">
          <span class="pulse-dot"></span>
          <span>Cracking the Coding Interview</span>
        </div>
        <h1 class="hero-title">Master the Technical Interview</h1>
        <p class="hero-subtitle">Structured learning tracks, deep-dive concept modules, interactive quizzes, and persistent progress tracking.</p>
        
        <div class="stats-row" role="region" aria-label="Progress statistics">
          <div class="stat-item">
            <div class="stat-value">${completed}/${total}</div>
            <div class="stat-label">Chapters Done</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${answeredCorrect}/${totalQuestions}</div>
            <div class="stat-label">Quiz Points</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${unlockedBadges.length}/${MILESTONES.length}</div>
            <div class="stat-label">Milestones</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">🔥 ${streak}</div>
            <div class="stat-label">Day Streak</div>
          </div>
        </div>
      </div>

      ${dbBannerHTML}
      ${viewToggleBarHTML}
      ${mainDashboardContent}

      <div class="cloud-sync-cta" role="complementary" aria-label="Cloud Sync">
        <div class="cloud-sync-cta-content">
          <div class="cloud-sync-badge">☁️ Cloud Synchronization</div>
          <div class="cloud-sync-title">Sync Your Progress Across Devices</div>
          <div class="cloud-sync-desc">Create a free account or sign in to seamlessly sync your chapter readings, quiz scores, and achievement milestone badges across all your devices.</div>
        </div>
        <button class="btn-primary" id="btnOpenAuthCTA">Sign In / Register →</button>
      </div>
    `;
  }

  // ── Tracks Roadmap View ──────────────────────────────────
  function renderTracksRoadmap() {
    const visibleTracks = selectedTrackFilter === "all"
      ? TRACKS
      : TRACKS.filter((t) => t.id === selectedTrackFilter);

    const tracksHTML = visibleTracks.map((track) => {
      const trackProgress = Storage.getTrackProgress(progress, track.id);

      const nodesHTML = track.chapters.map((chId, stepIndex) => {
        const ch = CHAPTERS.find((c) => c.id === chId);
        if (!ch) return "";
        const chProg = progress.chapters[ch.id] || {};

        let statusClass = "locked";
        let statusText = "Not Started";
        let actionLabel = "Start Module →";
        let cardStateClass = "";

        if (chProg.quizCompleted) {
          statusClass = "done";
          statusText = "Completed";
          actionLabel = "Review & Retake →";
          cardStateClass = "completed";
        } else if (chProg.contentRead) {
          statusClass = "ready";
          statusText = "Quiz Ready";
          actionLabel = "Take Quiz →";
          cardStateClass = "in-progress";
        }

        return `
          <div class="roadmap-node-card ${cardStateClass}" data-chapter="${ch.id}">
            <div class="node-top-bar">
              <span class="node-step-label">STEP ${String(stepIndex + 1).padStart(2, "0")}</span>
              <span class="node-status-indicator ${statusClass}">${statusText}</span>
            </div>
            <div class="node-title-row">
              <span class="node-icon">${ch.icon}</span>
              <span class="node-title">${ch.title}</span>
            </div>
            <div class="node-footer">
              <span class="node-action-text">${actionLabel}</span>
              ${chProg.quizCompleted ? `<span class="node-score-pill">${chProg.quizScore}/${ch.quiz.length} pts</span>` : ""}
            </div>
          </div>
        `;
      }).join("");

      return `
        <div class="track-card-section" style="border-top: 2px solid ${track.color};">
          <div class="track-header-row">
            <div class="track-header-left">
              <div class="track-badge-icon">${track.badge}</div>
              <div>
                <span class="track-number-pill" style="background: ${track.accentGlow}; color: ${track.color};">TRACK ${track.number}</span>
                <div class="track-title">${track.title}</div>
                <div class="track-desc">${track.description}</div>
              </div>
            </div>
            <div class="track-header-stats">
              <div class="track-pct-number" style="color: ${track.color};">${trackProgress.percent}%</div>
              <div class="track-count-text">${trackProgress.completed}/${trackProgress.total} Complete</div>
            </div>
          </div>

          <div class="roadmap-nodes-row">
            ${nodesHTML}
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="tracks-container">
        ${tracksHTML}
        ${renderMilestonesShelf()}
      </div>
    `;
  }

  // ── Milestone Badges Shelf ───────────────────────────────
  function renderMilestonesShelf() {
    const unlocked = Storage.getUnlockedMilestones(progress);

    const badgesHTML = MILESTONES.map((m) => {
      const isUnlocked = unlocked.some((u) => u.id === m.id);
      return `
        <div class="milestone-badge-card ${isUnlocked ? "unlocked" : "locked"}" title="${m.description}">
          <div class="milestone-badge-icon">${m.icon}</div>
          <div class="milestone-badge-info">
            <div class="milestone-badge-name">${m.title}</div>
            <div class="milestone-badge-desc">${isUnlocked ? "Unlocked ✓" : m.description}</div>
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="milestones-shelf">
        <div class="milestones-shelf-header">
          <div class="milestones-title">
            <span>🏆</span>
            <span>Achievement Milestones</span>
          </div>
          <span class="milestones-count-pill">${unlocked.length} of ${MILESTONES.length} Unlocked</span>
        </div>
        <div class="milestones-grid">
          ${badgesHTML}
        </div>
      </div>
    `;
  }

  // ── Chapters Grid View ───────────────────────────────────
  function renderChaptersGrid() {
    let cardsHTML = CHAPTERS.map((ch, i) => {
      const chProg = progress.chapters[ch.id] || {};

      let statusClass = "status-not-started";
      let statusLabel = "Not Started";
      let scoreText = "";

      if (chProg.quizCompleted) {
        statusClass = "status-completed";
        statusLabel = "Completed";
        scoreText = `${chProg.quizScore}/${ch.quiz.length}`;
      } else if (chProg.contentRead) {
        statusClass = "status-quiz-ready";
        statusLabel = "Quiz Ready";
      }

      const cardClass = chProg.quizCompleted ? "completed" : chProg.contentRead ? "in-progress" : "";

      return `
        <div class="chapter-card ${cardClass}" data-chapter="${ch.id}" style="animation-delay: ${i * 0.04}s">
          <div class="card-header">
            <div class="card-icon">${ch.icon}</div>
            <div class="card-number">CH ${String(ch.id).padStart(2, "0")}</div>
          </div>
          <div class="card-title">${ch.title}</div>
          <div class="card-description">${ch.description}</div>
          <div class="card-footer">
            <div class="card-status ${statusClass}">${statusLabel}</div>
            ${scoreText ? `<div class="card-score">Score: ${scoreText}</div>` : ""}
          </div>
        </div>
      `;
    }).join("");

    return `<div class="chapters-grid">${cardsHTML}</div>`;
  }

  // ── Helper: Escape HTML ──────────────────────────────────
  function escapeHTML(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ── Helper: Render Coding Problems List ───────────────────
  function renderProblemsHTML(problems) {
    if (!problems || problems.length === 0) {
      return `
        <div class="empty-state-box" style="text-align: center; padding: 3rem 1rem; color: var(--fg-muted); background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-xl);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📝</div>
          <div style="font-size: 1.15rem; color: var(--fg-primary); font-weight: 600; margin-bottom: 0.35rem;">কোনো কোডিং প্রবলেম পাওয়া যায়নি</div>
          <p style="max-width: 480px; margin: 0 auto; font-size: 0.9rem; line-height: 1.5;">এই চ্যাপ্টারের জন্য শীঘ্রই আরও ইন্টারভিউ প্রবলেমস যোগ করা হচ্ছে।</p>
        </div>
      `;
    }

    return `
      <div class="problems-list">
        ${problems.map((prob, i) => {
          const diffClass = (prob.difficulty || "medium").toLowerCase();

          let examplesHTML = "";
          if (prob.examples && prob.examples.length > 0) {
            examplesHTML = `
              <div class="problem-examples-box">
                ${prob.examples.map((ex, idx) => `
                  <div class="example-entry">
                    <div class="example-row">
                      <span class="example-label">Example ${idx + 1}:</span>
                      <span class="example-val">${escapeHTML(ex.input)}</span>
                    </div>
                    <div class="example-row">
                      <span class="example-label">Output:</span>
                      <span class="example-val">${escapeHTML(ex.output)}</span>
                    </div>
                    ${ex.explanation ? `<div style="color: var(--fg-dim); font-size: 0.84rem; margin-top: 0.25rem;">💡 <em>${ex.explanation}</em></div>` : ""}
                  </div>
                `).join("")}
              </div>
            `;
          }

          let hintsHTML = "";
          if (prob.hints && prob.hints.length > 0) {
            hintsHTML = `
              <div class="hints-container">
                ${prob.hints.map((hint, hIdx) => `
                  <details class="hint-details">
                    <summary class="hint-summary">💡 প্রগ্রেসিভ হিন্ট ${hIdx + 1} (ক্লিক করে উন্মোচন করুন)</summary>
                    <div class="hint-body">${hint}</div>
                  </details>
                `).join("")}
              </div>
            `;
          }

          let approachHTML = "";
          if (prob.approach) {
            approachHTML = `
              <div class="approach-card">
                <div class="approach-title">🧠 সর্বোত্তম সমাধান ও অ্যালগরিদম কৌশল</div>
                <div class="approach-text">${prob.approach}</div>
              </div>
            `;
          }

          let solutionsHTML = "";
          if (prob.solutions && prob.solutions.length > 0) {
            solutionsHTML = prob.solutions.map((sol) => `
              <div class="code-solution-box">
                <div class="code-header-bar">
                  <span class="code-lang-tag">${sol.language || "Code"} Solution</span>
                  <button class="btn-copy-code" data-code="${encodeURIComponent(sol.code)}">
                    📋 Copy Code
                  </button>
                </div>
                <pre class="code-pre"><code>${escapeHTML(sol.code)}</code></pre>
                ${sol.explanation ? `<div class="solution-note">ℹ️ ${sol.explanation}</div>` : ""}
              </div>
            `).join("");
          }

          let complexityHTML = "";
          if (prob.complexity) {
            complexityHTML = `
              <div class="complexity-footer">
                ${prob.complexity.time ? `
                  <div class="complexity-item">
                    <span class="complexity-label">Time Complexity:</span>
                    <span class="complexity-val">${prob.complexity.time}</span>
                  </div>
                ` : ""}
                ${prob.complexity.space ? `
                  <div class="complexity-item">
                    <span class="complexity-label">Space Complexity:</span>
                    <span class="complexity-val">${prob.complexity.space}</span>
                  </div>
                ` : ""}
              </div>
            `;
          }

          return `
            <div class="problem-card" style="animation-delay: ${i * 0.06}s">
              <div class="problem-header">
                <div class="problem-title-area">
                  <span class="problem-id-pill">PROB ${prob.id}</span>
                  <span class="problem-title-main">${prob.title}</span>
                  <span class="problem-title-bangla">${prob.banglaTitle ? `(${prob.banglaTitle})` : ""}</span>
                </div>
                <span class="difficulty-pill difficulty-${diffClass}">${prob.difficulty}</span>
              </div>
              <div class="problem-desc">${prob.description}</div>
              ${examplesHTML}
              ${hintsHTML}
              ${approachHTML}
              ${solutionsHTML}
              ${complexityHTML}
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  // ── Content View ─────────────────────────────────────────
  function renderContentView(chId) {
    const ch = CHAPTERS.find((c) => c.id === chId);
    if (!ch) return renderDashboard();

    const chProg = progress.chapters[ch.id] || {};
    const track = TRACKS.find((t) => t.chapters.includes(ch.id));
    const problems = ch.problems || [];

    // Concepts Section
    let conceptsHTML = ch.concepts.map((concept, i) => {
      let bigOHTML = "";
      if (concept.bigO) {
        const rows = Object.entries(concept.bigO)
          .map(([op, complexity]) => {
            const label = op.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
            return `<tr><td>${label}</td><td>${complexity}</td></tr>`;
          })
          .join("");
        bigOHTML = `
          <table class="bigo-table">
            <thead><tr><th>Operation</th><th>Complexity</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        `;
      }

      const tipsHTML = concept.tips
        ? `
        <div class="tips-section">
          <div class="tips-title">💡 Interview Tips</div>
          <ul class="tips-list">
            ${concept.tips.map((t) => `<li>${t}</li>`).join("")}
          </ul>
        </div>
      `
        : "";

      return `
        <div class="concept-card" style="animation-delay: ${i * 0.06}s">
          <div class="concept-title">${concept.title}</div>
          <div class="concept-body">${concept.content}</div>
          ${bigOHTML}
          ${tipsHTML}
        </div>
      `;
    }).join("");

    const activeTab = activeChapterTab || "concepts";

    return `
      <div class="content-header">
        ${
          track
            ? `<div style="font-size: 0.8rem; color: ${track.color}; font-weight: 600; font-family: var(--font-mono); margin-bottom: 0.5rem;">${track.title}</div>`
            : ""
        }
        <h1 class="content-title">${ch.icon} ${ch.title}</h1>
        <p class="content-subtitle">${ch.description}</p>
      </div>

      <!-- Segmented Navigation Bar -->
      <div class="chapter-segmented-nav">
        <button class="segment-btn ${activeTab === "concepts" ? "active" : ""}" data-tab="concepts">
          <span>📘 মূল ধারণা ও তত্ত্ব</span>
          <span class="segment-count-badge">${ch.concepts.length}</span>
        </button>
        <button class="segment-btn ${activeTab === "problems" ? "active" : ""}" data-tab="problems">
          <span>💻 ইন্টারভিউ সমস্যা ও সমাধান</span>
          <span class="segment-count-badge">${problems.length}</span>
        </button>
      </div>

      <!-- Main Body per Selected Segment -->
      ${
        activeTab === "concepts"
          ? `
            <div class="concepts-list">${conceptsHTML}</div>
            <div class="content-actions" style="display: flex; gap: 1rem; justify-content: flex-end; flex-wrap: wrap;">
              ${
                problems.length > 0
                  ? `<button class="btn-secondary" id="btnGoToProblems" style="padding: 0.75rem 1.4rem;">
                      অনুশীলন প্রবলেমস দেখুন (${problems.length}) →
                    </button>`
                  : ""
              }
              <button class="btn-primary" id="btnStartQuiz" data-chapter="${ch.id}">
                ${chProg.quizCompleted ? "Retake Quiz" : "Take Chapter Quiz"} (${ch.quiz.length} Questions) →
              </button>
            </div>
          `
          : `
            ${renderProblemsHTML(problems)}
            <div class="content-actions" style="display: flex; gap: 1rem; justify-content: flex-end; flex-wrap: wrap; margin-top: 2.5rem;">
              <button class="btn-secondary" id="btnGoToConcepts" style="padding: 0.75rem 1.4rem;">
                ← মূল ধারণাসমূহ পড়ুন
              </button>
              <button class="btn-primary" id="btnStartQuiz" data-chapter="${ch.id}">
                ${chProg.quizCompleted ? "Retake Quiz" : "Take Chapter Quiz"} (${ch.quiz.length} Questions) →
              </button>
            </div>
          `
      }
    `;
  }

  // ── Quiz View ────────────────────────────────────────────
  function renderQuizView(chId) {
    const ch = CHAPTERS.find((c) => c.id === chId);
    if (!ch) return renderDashboard();

    const q = ch.quiz[currentQuizIndex];
    const total = ch.quiz.length;
    const selectedAnswer = currentQuizAnswers[currentQuizIndex];
    const isAnswered = selectedAnswer !== undefined;
    const isLastQuestion = currentQuizIndex === total - 1;

    let optionsHTML = q.options.map((opt, i) => {
      let optClass = "";
      if (selectedAnswer === i) optClass = "selected";

      if (quizSubmitted) {
        if (i === q.correct) {
          optClass = "correct";
        } else if (selectedAnswer === i && i !== q.correct) {
          optClass = "incorrect";
        } else {
          optClass = "disabled";
        }
      }

      return `
        <div class="quiz-option ${optClass}" data-option="${i}">
          <div class="quiz-option-marker">${String.fromCharCode(65 + i)}</div>
          <div class="quiz-option-text">${opt}</div>
        </div>
      `;
    }).join("");

    let explanationHTML = "";
    if (quizSubmitted && q.explanation) {
      explanationHTML = `
        <div class="explanation-card">
          <div class="explanation-title">${selectedAnswer === q.correct ? "✓ Correct!" : "✕ Incorrect"}</div>
          <div class="explanation-text">${q.explanation}</div>
        </div>
      `;
    }

    let actionButtonHTML = "";
    if (!quizSubmitted) {
      actionButtonHTML = `
        <button class="btn-primary" id="btnSubmitAnswer" ${!isAnswered ? "disabled" : ""}>
          Submit Answer
        </button>
      `;
    } else if (!isLastQuestion) {
      actionButtonHTML = `
        <button class="btn-primary" id="btnNextQuestion">
          Next Question →
        </button>
      `;
    } else {
      actionButtonHTML = `
        <button class="btn-primary" id="btnFinishQuiz">
          View Results →
        </button>
      `;
    }

    return `
      <div class="quiz-container">
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width: ${((currentQuizIndex + 1) / total) * 100}%"></div>
        </div>
        <div class="quiz-header">
          <div class="quiz-counter">Question ${currentQuizIndex + 1} of ${total}</div>
          <div class="quiz-score-badge">Chapter ${ch.id} Quiz</div>
        </div>
        <div class="quiz-question">${q.question}</div>
        <div class="quiz-options">${optionsHTML}</div>
        ${explanationHTML}
        <div class="quiz-actions">${actionButtonHTML}</div>
      </div>
    `;
  }

  // ── Results View ─────────────────────────────────────────
  function renderResultsView(chId) {
    const ch = CHAPTERS.find((c) => c.id === chId);
    if (!ch) return renderDashboard();

    const chProg = progress.chapters[ch.id] || {};
    const score = chProg.quizScore || 0;
    const total = ch.quiz.length;
    const pct = Math.round((score / total) * 100);

    let message = "Keep practicing! Review the chapter concepts and retry.";
    let scoreColor = "#EF4444";
    if (pct >= 80) {
      message = "Outstanding! You have mastered this chapter!";
      scoreColor = "#10B981";
    } else if (pct >= 60) {
      message = "Good job! Review the concepts and try again for 100%.";
      scoreColor = "#F59E0B";
    }

    // Determine next chapter
    const nextChapter = CHAPTERS.find((c) => c.id === chId + 1);

    return `
      <div class="results-container">
        <div class="results-card">
          <div class="results-score-circle" style="border-color: ${scoreColor}; color: ${scoreColor}">
            ${score}/${total}
          </div>
          <h2 class="results-title">${pct >= 80 ? "Mastery Achieved! 🎉" : "Quiz Finished"}</h2>
          <p class="results-message">${message}</p>
          <div class="results-actions">
            <button class="btn-primary" id="btnRetryQuiz" data-chapter="${ch.id}">Retake Quiz ↺</button>
            ${
              nextChapter
                ? `<button class="btn-primary" id="btnNextChapter" data-chapter="${nextChapter.id}">Next Chapter (${nextChapter.title}) →</button>`
                : ""
            }
            <button class="btn-secondary" id="btnBackToDashboard">Back to Roadmap</button>
          </div>
        </div>
      </div>
    `;
  }

  // ── Auth Modal (Sign In / Register) ──────────────────────
  function showAuthModal(defaultTab = "login") {
    let currentTab = defaultTab;

    function renderModalContent() {
      modalContainer.innerHTML = `
        <div class="auth-modal-card">
          <button class="modal-close-btn" id="btnCloseAuth" aria-label="Close">✕</button>
          
          <div class="auth-tabs">
            <button class="auth-tab-btn ${currentTab === "login" ? "active" : ""}" data-tab="login">Sign In</button>
            <button class="auth-tab-btn ${currentTab === "register" ? "active" : ""}" data-tab="register">Create Account</button>
          </div>

          <div id="authAlertArea"></div>

          <form class="auth-form" id="authForm">
            ${
              currentTab === "register"
                ? `
              <div class="form-group">
                <label class="form-label" for="authName">Full Name</label>
                <input class="form-input" id="authName" type="text" placeholder="e.g. Alex Johnson" required />
              </div>
            `
                : ""
            }
            <div class="form-group">
              <label class="form-label" for="authEmail">Email Address</label>
              <input class="form-input" id="authEmail" type="email" placeholder="alex@example.com" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="authPassword">Password</label>
              <input class="form-input" id="authPassword" type="password" placeholder="At least 6 characters" minlength="6" required />
            </div>
            <button class="btn-auth-submit" id="btnAuthSubmit" type="submit">
              ${currentTab === "login" ? "Sign In & Sync Progress" : "Create Account & Sync Progress"}
            </button>
          </form>

          <p class="auth-note">
            ${
              dbStatus.connected
                ? "☁️ Connected to MongoDB: Your progress syncs across all devices."
                : "💡 Running in local environment. If MONGODB_URI is configured, accounts persist in MongoDB."
            }
          </p>
        </div>
      `;

      // Event listeners for modal
      modalContainer.querySelector("#btnCloseAuth").addEventListener("click", () => {
        modalContainer.classList.remove("visible");
        modalContainer.innerHTML = "";
      });

      modalContainer.querySelectorAll(".auth-tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          currentTab = btn.dataset.tab;
          renderModalContent();
        });
      });

      const form = modalContainer.querySelector("#authForm");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const alertArea = modalContainer.querySelector("#authAlertArea");
        const submitBtn = modalContainer.querySelector("#btnAuthSubmit");
        const email = modalContainer.querySelector("#authEmail").value.trim();
        const password = modalContainer.querySelector("#authPassword").value;

        submitBtn.disabled = true;
        submitBtn.textContent = "Authenticating...";
        alertArea.innerHTML = "";

        try {
          if (currentTab === "login") {
            const res = await Storage.login(email, password);
            progress = res.progress;
            showToast(`Welcome back, ${res.user.name}! Cloud progress loaded.`, "success");
          } else {
            const name = modalContainer.querySelector("#authName").value.trim();
            const res = await Storage.register(name, email, password);
            showToast(`Account created for ${res.user.name}! Progress linked.`, "success");
          }
          modalContainer.classList.remove("visible");
          modalContainer.innerHTML = "";
          render();
        } catch (err) {
          alertArea.innerHTML = `<div class="auth-error-alert">${err.message}</div>`;
          submitBtn.disabled = false;
          submitBtn.textContent = currentTab === "login" ? "Sign In & Sync Progress" : "Create Account & Sync Progress";
        }
      });
    }

    renderModalContent();
    modalContainer.classList.add("visible");
  }

  // ── Reset Progress Modal ─────────────────────────────────
  function showResetModal() {
    modalContainer.innerHTML = `
      <div class="modal-card">
        <span class="modal-icon">⚠️</span>
        <div class="modal-title">Reset All Progress?</div>
        <div class="modal-text">This will clear your reading history, quiz scores, and unlocked milestones. This action cannot be undone.</div>
        <div class="modal-actions">
          <button class="btn-secondary" id="btnCancelReset">Cancel</button>
          <button class="btn-danger" id="btnConfirmReset">Yes, Reset</button>
        </div>
      </div>
    `;

    modalContainer.classList.add("visible");

    modalContainer.querySelector("#btnCancelReset").addEventListener("click", () => {
      modalContainer.classList.remove("visible");
      modalContainer.innerHTML = "";
    });

    modalContainer.querySelector("#btnConfirmReset").addEventListener("click", () => {
      progress = Storage.reset();
      modalContainer.classList.remove("visible");
      modalContainer.innerHTML = "";
      showToast("Progress has been reset.", "info");
      render();
    });
  }

  // ── Milestones Modal ─────────────────────────────────────
  function showMilestonesModal() {
    const unlocked = Storage.getUnlockedMilestones(progress);

    const badgesHTML = MILESTONES.map((m) => {
      const isUnlocked = unlocked.some((u) => u.id === m.id);
      return `
        <div class="milestone-badge-card ${isUnlocked ? "unlocked" : "locked"}">
          <div class="milestone-badge-icon">${m.icon}</div>
          <div class="milestone-badge-info">
            <div class="milestone-badge-name">${m.title}</div>
            <div class="milestone-badge-desc">${m.description}</div>
            <div style="font-size: 0.7rem; margin-top: 4px; font-family: var(--font-mono); color: ${isUnlocked ? "#10B981" : "var(--fg-muted)"}">
              ${isUnlocked ? "Unlocked ✓" : "Locked ○"}
            </div>
          </div>
        </div>
      `;
    }).join("");

    modalContainer.innerHTML = `
      <div class="modal-card" style="max-width: 680px; text-align: left; position: relative;">
        <button class="modal-close-btn" id="btnCloseMilestones" aria-label="Close">✕</button>
        <div class="modal-title" style="margin-bottom: 1.25rem;">🏆 Achievement Milestones</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.85rem; max-height: 420px; overflow-y: auto; padding-right: 0.5rem;">
          ${badgesHTML}
        </div>
      </div>
    `;

    modalContainer.classList.add("visible");
    modalContainer.querySelector("#btnCloseMilestones").addEventListener("click", () => {
      modalContainer.classList.remove("visible");
      modalContainer.innerHTML = "";
    });
  }

  // ── Navigation Helper ────────────────────────────────────
  function navigateTo(view, chapterId) {
    currentQuizIndex = 0;
    currentQuizAnswers = [];
    quizSubmitted = false;

    if (chapterId && chapterId !== progress.activeChapter) {
      activeChapterTab = "concepts";
    }

    if (chapterId) progress.activeChapter = chapterId;
    progress.activeView = view;
    Storage.save(progress);

    sidebarOpen = false;
    userMenuOpen = false;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── Event Listeners ──────────────────────────────────────
  function attachEvents() {
    // Brand / Home navigation
    const goHome = document.getElementById("goHome");
    if (goHome) {
      goHome.addEventListener("click", () => navigateTo("dashboard"));
    }

    // Breadcrumb clicks
    document.querySelectorAll(".breadcrumb-link").forEach((el) => {
      el.addEventListener("click", () => {
        const nav = el.dataset.nav;
        const ch = el.dataset.chapter ? parseInt(el.dataset.chapter) : null;
        navigateTo(nav, ch);
      });
    });

    // View toggle buttons (Tracks vs Grid)
    document.querySelectorAll(".view-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        dashboardMode = btn.dataset.mode;
        render();
      });
    });

    // Track filter chips
    document.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        selectedTrackFilter = chip.dataset.filter;
        render();
      });
    });

    // Dismiss DB Banner
    const btnDismissBanner = document.getElementById("btnDismissDbBanner");
    if (btnDismissBanner) {
      btnDismissBanner.addEventListener("click", () => {
        dbBannerDismissed = true;
        const banner = document.getElementById("dbAlertBanner");
        if (banner) banner.remove();
      });
    }

    // Auth Trigger button (top bar)
    const btnOpenAuth = document.getElementById("btnOpenAuth");
    if (btnOpenAuth) {
      btnOpenAuth.addEventListener("click", () => showAuthModal("login"));
    }

    // Auth CTA button (dashboard)
    const btnOpenAuthCTA = document.getElementById("btnOpenAuthCTA");
    if (btnOpenAuthCTA) {
      btnOpenAuthCTA.addEventListener("click", () => showAuthModal("register"));
    }

    // User Profile dropdown toggle
    const userProfileBtn = document.getElementById("userProfileBtn");
    if (userProfileBtn) {
      userProfileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        userMenuOpen = !userMenuOpen;
        render();
      });
    }

    // Dropdown items
    const btnViewBadges = document.getElementById("btnViewBadges");
    if (btnViewBadges) {
      btnViewBadges.addEventListener("click", () => {
        userMenuOpen = false;
        showMilestonesModal();
      });
    }

    const btnSyncNow = document.getElementById("btnSyncNow");
    if (btnSyncNow) {
      btnSyncNow.addEventListener("click", async () => {
        userMenuOpen = false;
        try {
          await Storage.syncToCloud(progress);
          showToast("Progress successfully synchronized with MongoDB! ☁️", "success");
        } catch (err) {
          showToast("Sync failed: " + err.message, "error");
        }
      });
    }

    const btnLogout = document.getElementById("btnLogout");
    if (btnLogout) {
      btnLogout.addEventListener("click", () => {
        userMenuOpen = false;
        Storage.clearAuth();
        showToast("Signed out. Operating in Local Guest Mode.", "info");
        render();
      });
    }

    // Chapter navigation in sidebar & roadmap & cards
    document.querySelectorAll(".chapter-nav-item, .roadmap-node-card, .chapter-card").forEach((el) => {
      el.addEventListener("click", () => {
        const chId = parseInt(el.dataset.chapter);
        if (chId) {
          Storage.markContentRead(progress, chId);
          navigateTo("content", chId);
        }
      });
    });

    // Segmented navigation tabs (Concepts vs Problems)
    document.querySelectorAll(".segment-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeChapterTab = btn.dataset.tab;
        render();
      });
    });

    // Jump to Problems button
    const btnGoToProblems = document.getElementById("btnGoToProblems");
    if (btnGoToProblems) {
      btnGoToProblems.addEventListener("click", () => {
        activeChapterTab = "problems";
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Jump to Concepts button
    const btnGoToConcepts = document.getElementById("btnGoToConcepts");
    if (btnGoToConcepts) {
      btnGoToConcepts.addEventListener("click", () => {
        activeChapterTab = "concepts";
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Copy Code button
    document.querySelectorAll(".btn-copy-code").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const rawCode = decodeURIComponent(btn.dataset.code || "");
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(rawCode).then(() => {
            showToast("কোড ক্লিপবোর্ডে কপি করা হয়েছে! 📋", "success");
          }).catch(() => {
            showToast("ক্লিপবোর্ডে কপি করা সম্ভব হয়নি।", "warning");
          });
        } else {
          showToast("ক্লিপবোর্ড এপিআই সাপোর্ট করছে না।", "warning");
        }
      });
    });

    // Start Quiz button
    const btnStartQuiz = document.getElementById("btnStartQuiz");
    if (btnStartQuiz) {
      btnStartQuiz.addEventListener("click", () => {
        const chId = parseInt(btnStartQuiz.dataset.chapter);
        currentQuizIndex = 0;
        currentQuizAnswers = [];
        quizSubmitted = false;
        navigateTo("quiz", chId);
      });
    }

    // Quiz option selection
    document.querySelectorAll(".quiz-option:not(.disabled)").forEach((el) => {
      el.addEventListener("click", () => {
        if (quizSubmitted) return;
        const idx = parseInt(el.dataset.option);
        currentQuizAnswers[currentQuizIndex] = idx;
        render();
      });
    });

    // Submit answer
    const btnSubmit = document.getElementById("btnSubmitAnswer");
    if (btnSubmit) {
      btnSubmit.addEventListener("click", () => {
        if (currentQuizAnswers[currentQuizIndex] === undefined) return;
        quizSubmitted = true;
        render();
      });
    }

    // Next question
    const btnNext = document.getElementById("btnNextQuestion");
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        currentQuizIndex++;
        quizSubmitted = false;
        render();
      });
    }

    // Finish quiz
    const btnFinish = document.getElementById("btnFinishQuiz");
    if (btnFinish) {
      btnFinish.addEventListener("click", () => {
        const ch = CHAPTERS.find((c) => c.id === progress.activeChapter);
        if (ch) {
          let score = 0;
          ch.quiz.forEach((q, i) => {
            if (currentQuizAnswers[i] === q.correct) score++;
          });
          Storage.saveQuizResult(progress, ch.id, score, [...currentQuizAnswers]);
          navigateTo("results", ch.id);
        }
      });
    }

    // Results view buttons
    const btnRetry = document.getElementById("btnRetryQuiz");
    if (btnRetry) {
      btnRetry.addEventListener("click", () => {
        const chId = parseInt(btnRetry.dataset.chapter);
        currentQuizIndex = 0;
        currentQuizAnswers = [];
        quizSubmitted = false;
        navigateTo("quiz", chId);
      });
    }

    const btnNextChapter = document.getElementById("btnNextChapter");
    if (btnNextChapter) {
      btnNextChapter.addEventListener("click", () => {
        const chId = parseInt(btnNextChapter.dataset.chapter);
        Storage.markContentRead(progress, chId);
        navigateTo("content", chId);
      });
    }

    const btnBackDashboard = document.getElementById("btnBackToDashboard");
    if (btnBackDashboard) {
      btnBackDashboard.addEventListener("click", () => navigateTo("dashboard"));
    }

    // Reset progress
    const btnReset = document.getElementById("btnReset");
    if (btnReset) {
      btnReset.addEventListener("click", showResetModal);
    }

    // Mobile menu toggle
    const mobileBtn = document.getElementById("mobileMenuBtn");
    if (mobileBtn) {
      mobileBtn.addEventListener("click", () => {
        sidebarOpen = !sidebarOpen;
        const sidebar = document.getElementById("sidebar");
        const overlay = document.getElementById("sidebarOverlay");
        if (sidebar) sidebar.classList.toggle("open", sidebarOpen);
        if (overlay) overlay.classList.toggle("visible", sidebarOpen);
      });
    }

    // Sidebar overlay close
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener("click", () => {
        sidebarOpen = false;
        const sidebar = document.getElementById("sidebar");
        if (sidebar) sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("visible");
      });
    }
  }

  // ── Stagger Animation Helper ─────────────────────────────
  function applyStaggerAnimation() {
    document.querySelectorAll(".chapter-card, .concept-card, .roadmap-node-card").forEach((el, i) => {
      el.style.animationDelay = `${i * 0.04}s`;
    });
  }

  // ── Boot ─────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
