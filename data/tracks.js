/**
 * Learning Tracks Definition
 * Groups the 10 CTCI study chapters into 4 structured learning roadmaps.
 */

const TRACKS = [
  {
    id: "core-ds",
    number: "01",
    title: "Core Data Structures",
    shortTitle: "Data Structures",
    badge: "🧱",
    color: "#06b6d4",
    accentGlow: "rgba(6, 182, 212, 0.3)",
    description: "মেমোরি লেআউট, পয়েন্টার, contiguous বাফার এবং হ্যাশ-ভিত্তিক লুকেআপের মজবুত ভিত্তি গড়ে তুলুন।",
    estimatedHours: 8,
    chapters: [1, 2, 3]
  },
  {
    id: "hierarchical",
    number: "02",
    title: "Hierarchical & Low-Level Systems",
    shortTitle: "Trees & Bits",
    badge: "🌲",
    color: "#8b5cf6",
    accentGlow: "rgba(139, 92, 246, 0.3)",
    description: "Non-linear নোড গ্রাফ ট্রাভার্স করুন, রিকার্শন শাখা এক্সপ্লোর করুন এবং হার্ডওয়্যার গতিতে র বাইনারি মেমোরি নিয়ন্ত্রণ করুন।",
    estimatedHours: 10,
    chapters: [4, 5]
  },
  {
    id: "algorithmic",
    number: "03",
    title: "Algorithmic Mastery & Problem Solving",
    shortTitle: "Algorithms & DP",
    badge: "⚡",
    color: "#ec4899",
    accentGlow: "rgba(236, 72, 153, 0.3)",
    description: "গাণিতিক যুক্তি, divide-and-conquer, ডাইনামিক প্রোগ্রামিং মেমোইজেশন এবং অপটিমাল সর্টিং কৌশল জয় করুন।",
    estimatedHours: 14,
    chapters: [6, 8, 9]
  },
  {
    id: "architecture",
    number: "04",
    title: "System Architecture & Engineering",
    shortTitle: "Architecture & Systems",
    badge: "🏛️",
    color: "#f59e0b",
    accentGlow: "rgba(245, 158, 11, 0.3)",
    description: "ফল্ট-টলারেন্ট ডিস্ট্রিবিউটেড ক্লাউড আর্কিটেকচার, ক্যাশিং লেয়ার, লোড ব্যালেন্সার এবং মেইনটেইনেবল OOP কোড ডিজাইন করুন।",
    estimatedHours: 12,
    chapters: [7, 10]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = TRACKS;
}
