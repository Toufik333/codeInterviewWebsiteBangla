/**
 * Chapter 08: Recursion & Dynamic Programming
 */

const chapter08 = {
  id: 8,
  title: "Recursion & Dynamic Programming",
  icon: "⚡",
  description: "টপ-ডাউন মেমোইজেশন, বটম-আপ ট্যাবুলেশন, এবং সাব-প্রবলেম অপটিমাইজেশন।",
  concepts: [
    {
      title: "Recursion Fundamentals",
      content: "রিকার্শনের দুটি মূল অংশ: Base Case (যেখানে রিকার্শন থামে) এবং Recursive Case (যেখানে প্রবলেমকে ছোট সাব-প্রবলেমে ভেঙে পুনরায় কল করা হয়)। প্রতিটি রিকার্সিভ কলের জন্য কল স্ট্যাকে একটি ফ্রেম তৈরি হয় — বেস কেস না থাকলে Stack Overflow ঘটে।",
      tips: [
        "রিকার্শন ডিজাইন করার সহজ উপায়: বিশ্বাস রাখুন যে সাব-ফাংশনটি ছোট আকারের ইনপুটের জন্য সঠিক উত্তর এনে দেবে (Leap of Faith)।",
        "Stack space বাঁচাতে টেইল রিকার্শন বা ইটারেটিভ মেথড ব্যবহার করা যায়।"
      ]
    },
    {
      title: "Memoization (Top-Down DP)",
      content: "রিকার্সিভ ট্রিতে একই সাব-প্রবলেম বারবার হিসাব না করে একটি হ্যাশ ম্যাপ বা অ্যারেতে (ক্যাশে) ফলাফল সংরক্ষণ করে রাখা। এতে এক্সপোনেনশিয়াল টাইম O(2^n) নাটকীয়ভাবে পলিনোমিয়াল O(n)-এ নেমে আসে।",
      bigO: { memoFib: "O(n) time, O(n) space (cache + stack)" },
      tips: [
        "ফাংশনের প্যারামিটারগুলোই ক্যাশের কী (key) হিসেবে ব্যবহৃত হয় — প্যারামিটার যত কম হবে, ক্যাশিং তত কার্যকর হবে।"
      ]
    },
    {
      title: "Tabulation (Bottom-Up DP)",
      content: "রিকার্শন এবং কল স্ট্যাক এড়িয়ে ছোট সাব-প্রবলেম থেকে শুরু করে বড় প্রবলেমের দিকে টেবিল পূরণ করা। এতে কল স্ট্যাক ওভারফ্লোর কোনো ঝুঁকি থাকে না এবং প্রায়শই স্পেস অপটিমাইজ করে O(1)-এ নামিয়ে আনা যায়।",
      bigO: { tabFib: "O(n) time, O(1) space with rolling variables" },
      tips: [
        "বর্তমান মান যদি কেবল আগের ১ বা ২টি মানের ওপর নির্ভর করে, তবে পুরো অ্যারে না রেখে ২-৩টি ভ্যারিয়েবল দিয়েই সমাধান করুন।"
      ]
    },
    {
      title: "Recognizing DP Problems",
      content: "দুটি প্রধান লক্ষণ: Overlapping Subproblems (একই হিসাব বারবার আসা) এবং Optimal Substructure (সাব-প্রবলেমের সর্বোত্তম সমাধান মিলিয়ে মূল প্রবলেমের সর্বোত্তম সমাধান তৈরি হওয়া)।",
      tips: [
        "সাধারণ প্যাটার্ন: 0/1 Knapsack, Longest Common Subsequence, Coin Change, Grid Paths, এবং Partition Equal Subset।"
      ]
    }
  ],
  problems: [
    {
      id: "8.1",
      title: "Triple Step",
      banglaTitle: "তিন সিঁড়ি লাফানোর উপায়",
      difficulty: "Easy",
      description: "একটি শিশু n-টি সিঁড়ির একটি সিঁড়ির ধাপ বেয়ে ওপরে উঠছে। সে এক লাফে ১ ধাপ, ২ ধাপ, অথবা ৩ ধাপ উঠতে পারে। সে কত বিভিন্ন উপায়ে শীর্ষে পৌঁছাতে পারে তা বের করার অ্যালগরিদম লিখুন।",
      examples: [
        { input: "n = 3", output: "4", explanation: "উপায়গুলো: (1+1+1), (1+2), (2+1), (3)।" },
        { input: "n = 4", output: "7", explanation: "মোট ৭টি সম্ভাব্য পথ রয়েছে।" }
      ],
      constraints: ["n ধনাত্মক পূর্ণসংখ্যা"],
      hints: [
        "💡 Hint 1: শিশুটি শেষ পদক্ষেপে হয় ১ ধাপ, নয় ২ ধাপ, নয় ৩ ধাপ লাফ দিয়েছে।",
        "💡 Hint 2: ways(n) = ways(n-1) + ways(n-2) + ways(n-3)। এটি কি ফিবোনাচ্চির মতো?"
      ],
      approach: "সমস্যাটির গাণিতিক রিকার্শন হলো f(n) = f(n-1) + f(n-2) + f(n-3)। বেস কেস: f(0)=1, f(1)=1, f(2)=2। বটম-আপ ডাইনামিক প্রোগ্রামিং ও রোলিং ভ্যারিয়েবল দিয়ে O(n) সময় ও O(1) অতিরিক্ত মেমোরিতে সমাধান করা সম্ভব।",
      solutions: [
        {
          language: "javascript",
          code: `function countWays(n) {
  if (n < 0) return 0;
  if (n === 0) return 1;
  if (n <= 2) return n;

  let a = 1, b = 1, c = 2;
  for (let i = 3; i <= n; i++) {
    const next = a + b + c;
    a = b;
    b = c;
    c = next;
  }
  return c;
}`,
          explanation: "রোলিং ভ্যারিয়েবল ব্যবহারের ফলে মাত্র O(1) স্পেসে O(n) সময়ে সমাধান।"
        }
      ],
      complexity: { time: "O(n)", space: "O(1)" }
    },
    {
      id: "8.4",
      title: "Power Set",
      banglaTitle: "পাওয়ার সেট বা সব সাবসেট তৈরি",
      difficulty: "Medium",
      description: "একটি সেটের সব উপসেট (Subsets) রিটার্ন করার একটি অ্যালগরিদম লিখুন।",
      examples: [
        { input: "[1, 2]", output: "[[], [1], [2], [1, 2]]", explanation: "মোট ৪টি (২^২) উপসেট তৈরি হয়েছে।" }
      ],
      constraints: ["অ্যারের সব উপাদান স্বতন্ত্র (distinct)"],
      hints: [
        "💡 Hint 1: n আকারের সেটে মোট কতটি সাবসেট থাকে? উত্তর হলো 2^n।",
        "💡 Hint 2: প্রতি উপাদানের জন্য ২টি সিদ্ধান্ত: সেটিকে সাবসেটে নেব অথবা নেব না (Backtracking or Binary Representation)।"
      ],
      approach: "ব্যাকট্র্যাকিং অথবা ইটারেটিভ পদ্ধতি: ফাঁকা সেট `[[]]` দিয়ে শুরু করুন। প্রতিটি নতুন সংখ্যা এলে বিদ্যমান সব সাবসেটের সাথে সংখ্যাটি যোগ করে নতুন সাবসেটগুলো মূল লিস্টে যোগ করুন।",
      solutions: [
        {
          language: "javascript",
          code: `function getSubsets(set) {
  let allSubsets = [[]];

  for (const item of set) {
    const newSubsets = [];
    for (const subset of allSubsets) {
      newSubsets.push([...subset, item]);
    }
    allSubsets = allSubsets.concat(newSubsets);
  }

  return allSubsets;
}`,
          explanation: "বিদ্যমান সব সেটে নতুন উপাদান যোগ করে দ্বিগুণ আকারে সম্প্রসারণ।"
        }
      ],
      complexity: { time: "O(n × 2^n)", space: "O(n × 2^n)" }
    }
  ],
  quiz: [
    {
      question: "Dynamic Programming প্রয়োগের জন্য দুটি অপরিহার্য শর্ত কী কী?",
      options: [
        "Greedy Choice এবং Divide & Conquer",
        "Overlapping Subproblems এবং Optimal Substructure",
        "Sorted Input এবং Binary Balance",
        "Constant Space এবং Linear Time"
      ],
      correct: 1,
      explanation: "উপসমস্যাগুলোর পুনরাবৃত্তি (Overlapping) এবং উপসমস্যার অনুকূল সমাধান দিয়ে মূল সমস্যার অনুকূল সমাধান গঠন (Optimal Substructure) থাকলেই কেবল ডাইনামিক প্রোগ্রামিং সম্ভব।"
    },
    {
      question: "সাধারণ রিকার্সিভ ফিবোনাচ্চি অ্যালগরিদমের সময় জটিলতা কত?",
      options: ["O(n)", "O(n²)", "O(2^n)", "O(log n)"],
      correct: 2,
      explanation: "মেমোইজেশন ছাড়া প্রতিটি কল দুটি নতুন শাখা তৈরি করে, ফলে এক্সপোনেনশিয়াল O(2^n) সময় নেয়।"
    },
    {
      question: "Top-Down এবং Bottom-Up DP-র মধ্যে প্রধান পার্থক্য কোনটি?",
      options: [
        "Top-down ডাইনামিকালি মেমোরি বাড়ায়; bottom-up কমায়",
        "Top-down রিকার্শন ও মেমোইজেশন ব্যবহার করে; Bottom-up ইটারেশন ও টেবিল ব্যবহার করে",
        "Top-down সবসময় বেশি দ্রুত",
        "Bottom-up কেবল গ্রাফ অ্যালগরিদমে চলে"
      ],
      correct: 1,
      explanation: "Top-down মূল সমস্যা থেকে নিচে নেমে ক্যাশিং করে, আর Bottom-up বেস কেস থেকে শুরু করে ক্রমান্বয়ে উপরের দিকে টেবিল পূরণ করে।"
    },
    {
      question: "n সাইজের একটি সেটে মোট কতটি সাবসেট (পাওয়ার সেট) থাকে?",
      options: ["n!", "n²", "2^n", "2n"],
      correct: 2,
      explanation: "প্রতিটি উপাদান সেটে উপস্থিত থাকতে পারে অথবা অনুপস্থিত থাকতে পারে (২টি পছন্দ)। n-টি উপাদানের জন্য মোট ২ × ২ × ... = ২^n টি সাবসেট হয়।"
    },
    {
      question: "সিঁড়ি ওঠার সমস্যায় (১, ২ বা ৩ ধাপ) দশম ধাপে ওঠার উপায় জানতে আগের কয়টি ধাপের যোগফল দরকার?",
      options: ["১টি", "২টি", "৩টি", "৯টি"],
      correct: 2,
      explanation: "যেহেতু সর্বোচ্চ ৩ ধাপ লাফ দেওয়া যায়, তাই f(10) = f(9) + f(8) + f(7) — পূর্ববর্তী ৩টি ধাপের যোগফল।"
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = chapter08;
}
