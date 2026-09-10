/**
 * Milestone Badges Definition
 * Interactive achievements unlocked as the student progresses.
 */

const MILESTONES = [
  {
    id: "first_read",
    title: "জ্ঞানের সন্ধানে",
    icon: "📖",
    description: "আপনার প্রথম কনসেপ্ট মডিউলটি পড়ুন",
    check: (p) => Object.values(p.chapters || {}).some((c) => c.contentRead)
  },
  {
    id: "first_quiz",
    title: "প্রথম পরীক্ষা",
    icon: "🎯",
    description: "আপনার প্রথম চ্যাপ্টার কুইজ সম্পন্ন করুন",
    check: (p) => Object.values(p.chapters || {}).some((c) => c.quizCompleted)
  },
  {
    id: "track_1",
    title: "স্ট্রাকচার সেন্টিনেল",
    icon: "🧱",
    description: "সব Core Data Structures আয়ত্ত করুন (Track 1)",
    check: (p) => [1, 2, 3].every((id) => p.chapters?.[id]?.quizCompleted)
  },
  {
    id: "track_2",
    title: "বাইনারি বিস্ট",
    icon: "🌲",
    description: "Hierarchical & Bitwise Systems আয়ত্ত করুন (Track 2)",
    check: (p) => [4, 5].every((id) => p.chapters?.[id]?.quizCompleted)
  },
  {
    id: "track_3",
    title: "অ্যালগরিদম টেক্কা",
    icon: "⚡",
    description: "Algorithmic Mastery & DP আয়ত্ত করুন (Track 3)",
    check: (p) => [6, 8, 9].every((id) => p.chapters?.[id]?.quizCompleted)
  },
  {
    id: "track_4",
    title: "সিস্টেম আর্কিটেক্ট",
    icon: "🏛️",
    description: "System Architecture & OOP আয়ত্ত করুন (Track 4)",
    check: (p) => [7, 10].every((id) => p.chapters?.[id]?.quizCompleted)
  },
  {
    id: "perfect_quiz",
    title: "নিখুঁত পারফরম্যান্স",
    icon: "💯",
    description: "যেকোনো কুইজে নিখুঁত ৫/৫ স্কোর অর্জন করুন",
    check: (p) => Object.values(p.chapters || {}).some((c) => c.quizScore === 5)
  },
  {
    id: "ctci_grandmaster",
    title: "CTCI গ্র্যান্ডমাস্টার",
    icon: "👑",
    description: "সবগুলো ১০টি চ্যাপ্টার এবং কুইজ সম্পন্ন করুন",
    check: (p) => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].every((id) => p.chapters?.[id]?.quizCompleted)
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = MILESTONES;
}
