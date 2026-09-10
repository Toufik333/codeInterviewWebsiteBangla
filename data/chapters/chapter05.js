/**
 * Chapter 05: Bit Manipulation
 */

const chapter05 = {
  id: 5,
  title: "Bit Manipulation",
  icon: "⚙️",
  description: "XOR ট্রিকস, বিটমাস্কিং, এবং লো-লেভেল বাইনারি মেমোরি নিয়ন্ত্রণ শিখুন।",
  concepts: [
    {
      title: "Bitwise Operators",
      content: "মৌলিক অপারেটর: AND (&), OR (|), XOR (^), NOT (~), Left Shift (<<), এবং Right Shift (>>)। গুরুত্বপূর্ণ বৈশিষ্ট্য: x ^ x = 0, x ^ 0 = x। Left shift দ্বারা ২ দিয়ে গুণ এবং Right shift দ্বারা ২ দিয়ে পূর্ণসংখ্যা ভাগ বোঝায়।",
      bigO: { bitwiseOps: "O(1) CPU cycle level" },
      tips: [
        "XOR ক্যান্সেলেশন: অ্যারেতে সব সংখ্যা জোড়ায় থাকলে এবং একটি মাত্র সংখ্যা একা থাকলে সবগুলো XOR করলে ഒറ്റ সংখ্যাটি বের হয়ে আসে।",
        "Sign bit সংক্রান্ত ভুল এড়াতে JavaScript-এ unsigned right shift `>>>` ব্যবহার করা যায়।"
      ]
    },
    {
      title: "Common Bit Tricks",
      content: "i-তম বিট চেক: `(n & (1 << i)) !== 0`। i-তম বিট 1 সেট করা: `n | (1 << i)`। i-তম বিট ক্লিয়ার করা: `n & ~(1 << i)`। সর্বশেষ 1-বিট মুছে ফেলা (Brian Kernighan's Algorithm): `n & (n - 1)`। সংখ্যাটি ২-এর ঘাত (Power of 2) কিনা: `(n > 0) && (n & (n - 1)) === 0`।",
      tips: [
        "`n & (n - 1)` প্রতিটি ধাপে সংখ্যার সর্বডানের 1-বিটকে 0 করে দেয় — তাই 1-এর সংখ্যা গণনায় লুপ শুধু বিট সংখ্যার সমান চলে।",
        "দুটি সংখ্যার চিহ্ন বিপরীত কিনা তা `(x ^ y) < 0` দিয়ে O(1)-এ বোঝা যায়।"
      ]
    },
    {
      title: "Bitmask DP & Applications",
      content: "একটি পূর্ণসংখ্যার বিটগুলোকে boolean flag-এর সেট হিসেবে ব্যবহার করা যায় (Bitmask)। এটি Traveling Salesperson Problem (TSP) বা ছোট সেটের সাবসেট এক্সপ্লোর করতে O(2^n) মেমোরি স্টেট হিসেবে ব্যবহৃত হয়।",
      tips: [
        "Subset iteration: n সাইজের সেটের সব সাবসেট জেনারেট করতে 0 থেকে (1 << n) - 1 পর্যন্ত লুপ চালান।",
        "বিট ভেক্টর হিসেবে ব্যবহার করে মেমোরি খরচ ৩২ গুণ পর্যন্ত কমানো সম্ভব।"
      ]
    }
  ],
  problems: [
    {
      id: "5.1",
      title: "Insertion",
      banglaTitle: "বাইনারি বিট ইনসার্শন",
      difficulty: "Medium",
      description: "দুটি ৩২-বিট সংখ্যা N এবং M, এবং দুটি বিট পজিশন i ও j দেওয়া আছে। N-এর j থেকে i পজিশনের মধ্যে M-কে ইনসার্ট করার কোড লিখুন।",
      examples: [
        { input: "N = 10000000000, M = 10011, i = 2, j = 6", output: "10001001100", explanation: "N-এর ২ থেকে ৬ পজিশনে M বসানো হয়েছে।" }
      ],
      constraints: ["j এবং i-এর মধ্যবর্তী জায়গায় M সম্পূর্ণ ফিট করে"],
      hints: [
        "💡 Hint 1: প্রথমে N-এর j থেকে i বিটগুলোকে 0 দিয়ে ক্লিয়ার (মাস্ক) করতে হবে।",
        "💡 Hint 2: M-কে i ধাপ বামে শিফট (M << i) করে তারপর মাস্ক করা N-এর সাথে Bitwise OR (|) করুন।"
      ],
      approach: "একটি বিটমাস্ক তৈরি করুন যার j থেকে i পর্যন্ত বিটগুলো ০ এবং বাকি সব বিট ১। এই মাস্ক দিয়ে N-এর নির্দিষ্ট অংশ শূন্য করে ফেলুন (`n_cleared = N & mask`)। এরপর M-কে i ঘর বামে শিফট করে `n_cleared | (M << i)` করে দিন।",
      solutions: [
        {
          language: "javascript",
          code: `function updateBits(n, m, i, j) {
  const allOnes = ~0;
  const left = allOnes << (j + 1);
  const right = (1 << i) - 1;
  const mask = left | right;

  const nCleared = n & mask;
  const mShifted = m << i;

  return nCleared | mShifted;
}`,
          explanation: "মাস্কিং এবং শিফটিংয়ের মাধ্যমে O(1) বিট অপারেশন。"
        }
      ],
      complexity: { time: "O(1)", space: "O(1)" }
    },
    {
      id: "5.6",
      title: "Conversion",
      banglaTitle: "বিট রূপান্তর গণনা",
      difficulty: "Easy",
      description: "একটি পূর্ণসংখ্যা A-কে অন্য একটি পূর্ণসংখ্যা B-তে রূপান্তরিত করতে কয়টি বিট ফ্লিপ করতে হবে তা নির্ণয় করুন।",
      examples: [
        { input: "A = 29 (11101), B = 15 (01111)", output: "2", explanation: "দুটি সংখ্যার মধ্যে ২টি বিটে অমিল রয়েছে।" }
      ],
      constraints: ["৩২-বিট সাইনড ইন্টিজার"],
      hints: [
        "💡 Hint 1: দুটি সংখ্যার কোন কোন বিট আলাদা তা কোন বিট অপারেটর দিয়ে বের করা যায়?",
        "💡 Hint 2: XOR (A ^ B) চালালে যেখানে অমিল আছে কেবল সেই বিটগুলো ১ হবে। তারপর ১-এর সংখ্যা গুনুন।"
      ],
      approach: "A এবং B-এর মধ্যে XOR চালান: `diff = A ^ B`। এরপর Brian Kernighan's অ্যালগরিদম (`diff = diff & (diff - 1)`) চালিয়ে ১-এর সংখ্যা গণনা করুন।",
      solutions: [
        {
          language: "javascript",
          code: `function bitSwapRequired(a, b) {
  let count = 0;
  let diff = a ^ b;
  while (diff !== 0) {
    count++;
    diff = diff & (diff - 1); // সর্বডানের ১-বিটটি মুছে ফেলে
  }
  return count;
}`,
          explanation: "XOR এবং Brian Kernighan পদ্ধতিতে সরাসরি অমিল হওয়া বিটের সংখ্যা গোনা হয়।"
        }
      ],
      complexity: { time: "O(k) যেখানে k হলো অমিল বিটের সংখ্যা (সর্বোচ্চ ৩২)", space: "O(1)" }
    }
  ],
  quiz: [
    {
      question: "x ^ x-এর মান সবসময় কত?",
      options: ["1", "x", "0", "~x"],
      correct: 2,
      explanation: "XOR অপারেশনে দুটি বিট একই হলে ফলাফল ০ হয়। তাই যেকোনো সংখ্যাকে নিজের সাথে XOR করলে ফলাফল সর্বদা ০।"
    },
    {
      question: "একটি সংখ্যা n দুইয়ের ঘাত (power of 2) কিনা তা O(1)-এ কীভাবে পরীক্ষা করা যায়?",
      options: ["n % 2 === 0", "(n & (n - 1)) === 0 (এবং n > 0)", "(n | (n - 1)) === 0", "(n ^ (n - 1)) === 1"],
      correct: 1,
      explanation: "২-এর ঘাতে একটি মাত্র ১-বিট থাকে। ১ বিয়োগ করলে সেই ১-বিট ০ হয়ে যায় এবং ডানের সব বিট ১ হয়ে যায়। ফলে `n & (n - 1)` ০ হয়।"
    },
    {
      question: "Brian Kernighan-এর অ্যালগরিদমে `n & (n - 1)` অপারেশনটি কী করে?",
      options: [
        "সংখ্যার মান দ্বিগুণ করে",
        "সবচেয়ে ডানের (least significant) ১-বিটটিকে ০-তে পরিণত করে",
        "সংখ্যাটিকে ঋণাত্মক করে",
        "সর্ববামের ১-বিটটিকে উল্টে দেয়"
      ],
      correct: 1,
      explanation: "এই ট্রিকটি প্রতিটি ধাপে সংখ্যার সর্বনিম্ন ১-বিটকে ক্লিয়ার করে দেয়, ফলে শুধু ১ থাকা বিটগুলোর জন্য লুপ চলে।"
    },
    {
      question: "একটি সংখ্যাকে বামে ১ ঘর শিফট করলে (`x << 1`) গাণিতিকভাবে কী ঘটে?",
      options: ["১ যোগ হয়", "২ দিয়ে গুণ হয়", "২ দিয়ে ভাগ হয়", "সংখ্যাটি উল্টে যায়"],
      correct: 1,
      explanation: "বাইনারি ব্যবস্থায় বামে এক ধাপ শিফট করা মানে মানের সাথে ২ গুণ করা।"
    },
    {
      question: "অ্যারেতে একটি বাদে সব সংখ্যা দুবার করে আছে। একক সংখ্যাটি কীভাবে O(n) টাইম ও O(1) স্পেসে পাওয়া যায়?",
      options: ["সব যোগ করে", "সব উপাদানকে পর্যায়ক্রমে XOR করে", "অ্যারে সর্ট করে", "হ্যাশ সেট বানিয়ে"],
      correct: 1,
      explanation: "একই সংখ্যা জোড়ায় থাকলে a ^ a = 0 হয়ে বিলীন হয়ে যায়, দিনশেষে কেবল বিজোড় উপাদানটি অবশিষ্ট থাকে।"
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = chapter05;
}
