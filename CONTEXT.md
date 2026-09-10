# CTCI Prep (Bangla Edition) — Project Context & Architectural Guide

## 1. Project Overview & Mission

**CTCI Prep Bangla** is a comprehensive, track-based coding interview preparation platform built specifically for Bengali-speaking software engineers preparing for top-tier tech interviews (FAANG / MANGA, multinational corporations, and global tech firms).

The platform bridges the language barrier by providing rigorous computer science concepts, real *Cracking the Coding Interview* (CTCI 6th Edition) problems, progressive hints, algorithmic intuition, multi-language solutions, and interactive quizzes entirely in **Bangla** while retaining standard English technical terminology.

### Core Visual & Interaction Philosophy
- **Aesthetic**: Minimalist Dark Mode inspired by modern developer-first interfaces (Linear, Raycast, Vercel).
- **Design Elements**: Dark monochromatic surfaces, subtle amber/gold accent glow (`#F59E0B`), glassmorphism backdrop filters, custom atmospheric orbs, and responsive layouts.
- **Typography**: Space Grotesk (Headlines), Inter (Body copy), and JetBrains Mono (Code, complexity metrics, and numerical data).

---

## 2. Technology Stack & Runtime Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT (BROWSER)                       │
│  index.html ──► styles.css ──► data.js ──► storage.js ──► app.js  │
└──────────────────────────────┬──────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
┌─────────────────────────────┐ ┌─────────────────────────────┐
│    LOCAL / GUEST STORAGE    │ │     CLOUD BACKEND API       │
│  • LocalStorage caching     │ │  • Express.js (server.js)   │
│  • Offline-first fallback   │ │  • Serverless (api/index.js)│
│  • Instant state hydration  │ │  • JWT Auth & bcryptjs      │
└─────────────────────────────┘ └──────────────┬──────────────┘
                                               │
                                               ▼
                                ┌─────────────────────────────┐
                                │       MONGODB ATLAS         │
                                │  • User Profiles & Auth     │
                                │  • Persistent Cloud Sync    │
                                │  • Cross-device progress    │
                                └─────────────────────────────┘
```

| Layer | Technologies & Dependencies | Purpose |
| :--- | :--- | :--- |
| **Frontend Core** | HTML5, Vanilla JavaScript (ES6+), Vanilla CSS | Ultra-fast SPA with zero bundle overhead and instant rendering. |
| **Styling** | Custom CSS Variables, Glassmorphism, Micro-animations | Dark linear aesthetic, ambient glow orbs, responsive layouts. |
| **Data Layer** | Modular JS modules (`data/chapters/*.js`), Python bundler | Structured curriculum (Concepts + CTCI Problems + Quizzes). |
| **Client Storage** | `storage.js` (LocalStorage + Cloud Sync manager) | Offline-first state persistence with seamless background synchronization. |
| **Backend & API** | Node.js, Express (`^4.21.2`), Vercel Serverless (`api/`) | REST API for authentication, status checks, and progress syncing. |
| **Database** | MongoDB Atlas, Mongoose (`^8.9.5`) | User document persistence, bcrypt password hashing, progress storage. |
| **Dev Tooling** | Python 3 (`scripts/extract_or_expand_data.py`) | Chapter schema validation, problem template generator, and bundler. |

---

## 3. Directory & File Structure

```
codeInterviewWebsiteBangla/
├── .env                              # Local environment variables (MONGODB_URI, JWT_SECRET)
├── .env.example                      # Template for environment configuration
├── .gitignore                        # Git exclusions (node_modules, .env, OS artifacts)
├── vercel.json                       # Vercel deployment configuration for serverless routes
├── package.json                      # Node dependencies and npm scripts
├── package-lock.json                 # Dependency lockfile
├── server.js                         # Local development Express server (Port 3000)
├── index.html                        # Main SPA HTML shell and font links
├── styles.css                        # Complete design system, themes, and responsive CSS
├── storage.js                        # Offline-first storage and MongoDB cloud sync client
├── app.js                            # Main SPA controller, routing, quiz engine, and UI logic
├── data.js                           # Master bundled curriculum data (served to client)
├── api/
│   └── index.js                      # Express API routes (Auth, Cloud Sync, Status)
├── models/
│   └── User.js                       # Mongoose User schema and progress model
├── data/
│   ├── index.js                      # Node/Browser data aggregator
│   ├── tracks.js                     # Learning tracks definitions (4 tracks)
│   ├── milestones.js                 # Achievement badges definitions (8 milestones)
│   └── chapters/                     # Modular chapter files (avoids AI hallucination)
│       ├── chapter01.js              # Arrays & Strings
│       ├── chapter02.js              # Linked Lists
│       ├── chapter03.js              # Stacks & Queues
│       ├── chapter04.js              # Trees & Graphs
│       ├── chapter05.js              # Bit Manipulation
│       ├── chapter06.js              # Math & Logic Puzzles
│       ├── chapter07.js              # Object-Oriented Design
│       ├── chapter08.js              # Recursion & Dynamic Programming
│       ├── chapter09.js              # Sorting & Searching
│       └── chapter10.js              # System Design & Scalability
└── scripts/
    └── extract_or_expand_data.py     # Python CLI for data validation, templates & bundling
```

---

## 4. Learning Tracks & Curriculum Architecture

The 10 CTCI modules are organized into **4 structured tracks**:

### Track 01: Core Data Structures
- **Badge**: 🧱 | **Color**: `#06b6d4` (Cyan) | **Est. Time**: 8 Hours
- **Chapters**:
  - `CH 01`: **Arrays & Strings** (Contiguous buffers, hash tables, two-pointer, string immutability).
  - `CH 02`: **Linked Lists** (Singly/doubly linked lists, Floyd's cycle runner, in-place reversal).
  - `CH 03`: **Stacks & Queues** (LIFO/FIFO, monotonic stack, min stack, bounded buffers).

### Track 02: Hierarchical & Low-Level Systems
- **Badge**: 🌲 | **Color**: `#8b5cf6` (Purple) | **Est. Time**: 10 Hours
- **Chapters**:
  - `CH 04`: **Trees & Graphs** (DFS/BFS, In-order/Pre-order/Post-order, BST validation, Trie, DAG topological sort).
  - `CH 05`: **Bit Manipulation** (Bitwise ops, Brian Kernighan's trick, XOR properties, bit vectors).

### Track 03: Algorithmic Mastery & Problem Solving
- **Badge**: ⚡ | **Color**: `#ec4899` (Pink) | **Est. Time**: 14 Hours
- **Chapters**:
  - `CH 06`: **Math & Logic Puzzles** (Sieve of Eratosthenes, Bayes' theorem, egg drop, poison testing).
  - `CH 08`: **Recursion & Dynamic Programming** (Memoization, Tabulation, rolling variables, Power Set).
  - `CH 09`: **Sorting & Searching** (Merge/Quick/Heap sort, Counting sort, Rotated binary search).

### Track 04: System Architecture & Engineering
- **Badge**: 🏛️ | **Color**: `#f59e0b` (Amber) | **Est. Time**: 12 Hours
- **Chapters**:
  - `CH 07`: **Object-Oriented Design** (Encapsulation, Polymorphism, SOLID principles, GoF patterns).
  - `CH 10`: **System Design & Scalability** (Horizontal vs vertical, Redis caching, CAP theorem, Rate limiter, TinyURL).

---

## 5. Data Model & Schema Specifications

To prevent AI hallucination and ensure clean programmatic access, all chapter files in `data/chapters/` strictly adhere to the following schema:

```javascript
const chapterXX = {
  id: 1,                             // Integer (1-10)
  title: "Arrays & Strings",         // English title
  icon: "📊",                        // Emoji / Icon
  description: "...",                // Bengali summary
  concepts: [                        // Array of concept guides
    {
      title: "Array Fundamentals",
      content: "...",                // Bengali theoretical explanation
      bigO: { access: "O(1)", ... }, // Big-O table entries (optional)
      tips: [ "..." ]                // Interview tips list (optional)
    }
  ],
  problems: [                        // Array of real CTCI coding problems
    {
      id: "1.1",                     // CTCI problem number
      title: "Is Unique",            // English title
      banglaTitle: "অনন্য ক্যারেক্টার", // Bengali title
      difficulty: "Easy",            // "Easy" | "Medium" | "Hard"
      description: "...",            // Bengali problem statement
      examples: [
        { input: "...", output: "...", explanation: "..." }
      ],
      constraints: [ "..." ],
      hints: [                       // Progressive collapsible hints
        "💡 Hint 1: ...",
        "💡 Hint 2: ..."
      ],
      approach: "...",               // Bengali intuition & optimal strategy
      solutions: [                   // Multi-language code solutions
        {
          language: "javascript",
          code: "function isUnique(str) { ... }",
          explanation: "..."
        }
      ],
      complexity: {
        time: "O(n)",
        space: "O(1)"
      }
    }
  ],
  quiz: [                            // 5 MCQ evaluation questions
    {
      question: "...",
      options: [ "A", "B", "C", "D" ],
      correct: 1,                    // 0-indexed correct option
      explanation: "..."             // Bengali explanation
    }
  ]
};
```

---

## 6. How to Add & Expand Curriculum Data Safely

### Rule 1: Never Edit `data.js` Directly
`data.js` is an auto-generated distribution bundle. **Always edit individual chapter files** inside `data/chapters/chapterXX.js`.

### Rule 2: Use the Python Automation Tool
A dedicated Python automation script is located in `scripts/extract_or_expand_data.py`:

```bash
# 1. Validate all chapter files for missing keys, syntax, and question counts:
python scripts/extract_or_expand_data.py --validate

# 2. Re-bundle all modular chapters into the distribution data.js file:
python scripts/extract_or_expand_data.py --bundle

# 3. Generate a scaffolded template for a new problem:
python scripts/extract_or_expand_data.py --new-problem --chapter 1 --title "String Compression"
```

---

## 7. Storage, Progress & Cloud Synchronization

- **Guest / Offline Mode**: User progress is saved in `localStorage` under key `ctci_progress`. Works with zero network latency and without an account.
- **Account Mode**: When registered/logged in via JWT, progress is mirrored to the MongoDB Atlas database.
- **Conflict Resolution**: The cloud progress takes precedence upon initial login; subsequent state changes trigger background sync via `Storage.syncToCloud(progress)`.
- **Milestone Engine**: Evaluates criteria defined in `data/milestones.js` (e.g., track completion, perfect quiz scores, first read).

---

## 8. Local Setup & Running Commands

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables (optional for local guest mode)
cp .env.example .env
# Edit MONGODB_URI and JWT_SECRET if using cloud authentication

# 3. Start development server
npm run dev

# 4. Access application
# Open http://localhost:3000 in your browser
```

---

## 9. Conventions for Future AI Agents & Developers

1. **Language Convention**:
   - Technical terms (e.g., *Hash Table, Dynamic Array, Amortized O(1), Pointer, Runner Technique*) should be written in English or standard transliterated forms alongside Bengali explanations.
   - All conceptual walkthroughs, hints, and problem statements should be written in natural, fluent Bengali.
2. **Code Integrity**:
   - Solutions must include verified Big-O complexities.
   - Code blocks should be clean, commented, and syntactically valid.
3. **Responsive UI**:
   - All new UI additions must be tested across mobile (< 480px), tablet (900px), and desktop viewports.
   - Use CSS custom variables defined in `:root` inside `styles.css`.
