/**
 * Chapter 01: Arrays & Strings
 */

const chapter01 = {
  id: 1,
  title: "Arrays & Strings",
  icon: "📊",
  description: "Contiguous memory, hashing tricks, এবং ক্লাসিক string manipulation patterns আয়ত্ত করুন।",
  concepts: [
    {
      title: "Array Fundamentals",
      content: "Arrays মেমোরিতে contiguous ব্লকে এলিমেন্ট স্টোর করে, যার ফলে index দিয়ে O(1) random access পাওয়া যায়। Insertions এবং deletions যেকোনো পজিশনে করতে O(n) সময় নেয় কারণ বাকি এলিমেন্টগুলো shift করতে হয়। Dynamic arrays (যেমন ArrayList বা JavaScript arrays) পূর্ণ হয়ে গেলে দ্বিগুণ capacity নেয়, যা amortized O(1) appends সুবিধা দেয়।",
      bigO: { access: "O(1)", search: "O(n)", insert: "O(n)", delete: "O(n)", append: "O(1) amortized" },
      tips: [
        "প্রবলেমে allow করলে array-টা আগে sort করে নিন — এতে two-pointer এবং binary search টেকনিক ব্যবহার সহজ হয়।",
        "Boundary index-গুলোতে off-by-one errors যাতে না হয় সেদিকে খেয়াল রাখুন।",
        "যদি O(1) lookup দরকার হয়, তবে hash map ব্যবহারের কথা বিবেচনা করুন।"
      ]
    },
    {
      title: "Hash Tables & Sets",
      content: "Hash tables একটি hash function ব্যবহার করে key-কে value-এর সাথে map করে। Average-case-এ insert, delete, এবং lookup-এর জন্য O(1) সময় নেয়। Collisions হলে worst-case O(n) হতে পারে, তবে ভালো hash function থাকলে তা বিরল। কোনো value ছাড়া শুধু membership check করার জন্য Set ব্যবহার করুন।",
      bigO: { insert: "O(1) avg", delete: "O(1) avg", lookup: "O(1) avg", worstCase: "O(n)" },
      tips: [
        "Two-Sum pattern: O(n) সলিউশনের জন্য hash map-এ complements স্টোর করুন।",
        "Frequency counting: anagram এবং permutation প্রবলেম সলভ করতে char → count map তৈরি করুন।",
        "O(n) টাইমে duplicates detect করতে hash sets ব্যবহার করুন।"
      ]
    },
    {
      title: "Two-Pointer Technique",
      content: "একটি sorted array-এর শুরুতে একটি pointer এবং শেষে আরেকটি pointer রাখুন। Condition চেক করে তাদের ভেতরের দিকে এগিয়ে নিন। এই টেকনিক অনেক O(n²) brute-force সলিউশনকে O(n)-এ নামিয়ে আনে।",
      tips: [
        "ক্লাসিক ব্যবহার: pair sum, container with most water, এবং in-place duplicates রিমুভ করা।",
        "Sliding window হলো এরই একটি রূপভেদ — running window দিয়ে subarray বা substring সংক্রান্ত প্রবলেমে এটি ব্যবহার করুন।",
        "Input array-টি sorted কিনা তা সবসময় নিশ্চিত হয়ে নিন; sorted না হলে আগে O(n log n)-এ sort করে নিন।"
      ]
    },
    {
      title: "String Manipulation Patterns",
      content: "বেশিরভাগ ল্যাঙ্গুয়েজে strings immutable — তাই loop-এর ভেতরে concatenation করলে O(n²) কাজ হয়। এর বদলে StringBuilder বা array-join pattern ব্যবহার করা উচিত। সচরাচর ইন্টারভিউতে palindromes, anagrams, substrings, এবং encoding/decoding সংক্রান্ত প্রবলেম বেশি আসে।",
      tips: [
        "দুটি string anagram কিনা তা চেক করতে তাদের sorted version অথবা character frequency map তুলনা করুন।",
        "Palindrome চেক করার জন্য দুই প্রান্ত থেকে two pointers ভেতরের দিকে নিয়ে আসুন।",
        "URL encoding, run-length encoding, এবং string rotation ইন্টারভিউয়ের জন্য খুবই কমন টপিক।"
      ]
    }
  ],
  problems: [
    {
      id: "1.1",
      title: "Is Unique",
      banglaTitle: "অনন্য ক্যারেক্টার যাচাই",
      difficulty: "Easy",
      description: "একটি string-এ সব character অনন্য (unique) কিনা তা নির্ধারণ করতে একটি অ্যালগরিদম বাস্তবায়ন করুন। কোনো অতিরিক্ত ডেটা স্ট্রাকচার ব্যবহার না করতে পারলে কীভাবে করবেন?",
      examples: [
        { input: '"abcdef"', output: "true", explanation: "সবগুলো অক্ষরই আলাদা।" },
        { input: '"hello"', output: "false", explanation: "'l' অক্ষরটি দুইবার আছে।" }
      ],
      constraints: [
        "String-এর দৈর্ঘ্য 0 থেকে 10^5 হতে পারে",
        "ইনপুটে স্ট্যান্ডার্ড ASCII বা Unicode অক্ষর থাকতে পারে"
      ],
      hints: [
        "💡 Hint 1: প্রতিটি ক্যারেক্টারের উপস্থিতি ট্র্যাক করার জন্য Hash Table বা Set ব্যবহার করার কথা ভাবুন।",
        "💡 Hint 2: যদি অতিরিক্ত ডেটা স্ট্রাকচার নিষিদ্ধ হয়, তবে স্ট্রিংটিকে O(n log n) সময়ে Sort করে পাশাপাশি অক্ষরগুলো তুলনা করতে পারেন কি?",
        "💡 Hint 3: অক্ষরগুলো যদি শুধু a-z হয়, তবে একটি মাত্র 32-bit Integer-কে Bit Vector হিসেবে ব্যবহার করে O(1) স্পেসে করা যায়।"
      ],
      approach: "সর্বোত্তম উপায়ে সমাধান করতে আমরা একটি Hash Set বা boolean array ব্যবহার করতে পারি। প্রতিটি ক্যারেক্টার স্ক্যান করার সময় যদি তা সেটে থাকে, সাথে সাথে false রিটার্ন করব। মেমোরি কনস্ট্রেইন্ট থাকলে Bit Vector বা In-place sorting ব্যবহারযোগ্য।",
      solutions: [
        {
          language: "javascript",
          code: `function isUnique(str) {
  // ASCII ধরে নিলে ১২৮ অক্ষরের বেশি হলে নিশ্চিত ডুপ্লিকেট আছে (Pigeonhole Principle)
  if (str.length > 128) return false;

  const seen = new Set();
  for (const char of str) {
    if (seen.has(char)) return false;
    seen.add(char);
  }
  return true;
}`,
          explanation: "Set ব্যবহার করে প্রতি ক্যারেক্টার O(1)-এ চেক এবং ইনসার্ট করা হয়।"
        },
        {
          language: "python",
          code: `def is_unique(s: str) -> bool:
    if len(s) > 128:
        return False
    seen = set()
    for char in s:
        if char in seen:
            return False
        seen.add(char)
    return True`,
          explanation: "পাইথনের হ্যাশ সেট ব্যবহার করে গড় O(1) লুকেআপ।"
        }
      ],
      complexity: { time: "O(n)", space: "O(1) কারণ ক্যারেক্টার সেট সর্বোচ্চ ১২৮/২৫৬ সাইজের" }
    },
    {
      id: "1.2",
      title: "Check Permutation",
      banglaTitle: "অ্যানাগ্রাম বা পারমিউটেশন যাচাই",
      difficulty: "Easy",
      description: "দুটি string দেওয়া থাকলে, একটি অপরটির permutation (বা anagram) কিনা তা পরীক্ষা করার একটি মেথড লিখুন।",
      examples: [
        { input: '"god", "dog"', output: "true", explanation: "উভয় স্ট্রিং-এ একই অক্ষরগুলো ভিন্ন ক্রমে রয়েছে।" },
        { input: '"abc", "abd"', output: "false", explanation: "'c' এবং 'd' অক্ষর অমিল।" }
      ],
      constraints: ["Case-sensitive বিবেচনা করুন", "Whitespace তাৎপর্যপূর্ণ"],
      hints: [
        "💡 Hint 1: Permutation-এর প্রধান বৈশিষ্ট্য হলো উভয়ের দৈর্ঘ্য সমান এবং প্রতিটি অক্ষরের ফ্রিকোয়েন্সি সমান হতে হবে।",
        "💡 Hint 2: উভয় স্ট্রিং সর্ট করলে কি তারা হুবহু এক হবে? সর্টিংয়ের টাইম ও স্পেস কেমন হবে?",
        "💡 Hint 3: একটি Character Frequency Map বানিয়ে এক স্ট্রিং দিয়ে কাউন্ট বাড়িয়ে অন্যটি দিয়ে কমিয়ে কি O(n) সময়ে করা যায়?"
      ],
      approach: "প্রথমে দুটি স্ট্রিংয়ের দৈর্ঘ্য সমান কিনা চেক করুন। দৈর্ঘ্য সমান হলে একটি ফ্রিকোয়েন্সি অ্যারে বা হ্যাশ ম্যাপে প্রথম স্ট্রিংয়ের প্রতিটি অক্ষরের সংখ্যা গণনা করুন, এরপর দ্বিতীয় স্ট্রিং দিয়ে সংখ্যাগুলো বিয়োগ করুন। কোনো সংখ্যা ০-এর নিচে গেলে তারা permutation নয়।",
      solutions: [
        {
          language: "javascript",
          code: `function checkPermutation(s1, s2) {
  if (s1.length !== s2.length) return false;

  const counts = {};
  for (const c of s1) {
    counts[c] = (counts[c] || 0) + 1;
  }
  for (const c of s2) {
    if (!counts[c]) return false;
    counts[c]--;
  }
  return true;
}`,
          explanation: "একটি অবজেক্টে ক্যারেক্টার কাউন্ট সংরক্ষণ করে O(n) টাইমে ভেরিফাই করা হয়।"
        }
      ],
      complexity: { time: "O(n)", space: "O(c) যেখানে c হলো অক্ষরের বৈচিত্র্য" }
    },
    {
      id: "1.3",
      title: "URLify",
      banglaTitle: "স্ট্রিংয়ের স্পেস রিপ্লেসমেন্ট",
      difficulty: "Easy",
      description: "একটি string-এর ভেতরের সব space-কে '%20' দিয়ে রিপ্লেস করার একটি মেথড লিখুন। স্ট্রিংটিতে অতিরিক্ত স্পেসের জন্য শেষে পর্যাপ্ত জায়গা আছে এবং আসল দৈর্ঘ্য 'true length' দেওয়া থাকবে।",
      examples: [
        { input: '"Mr John Smith    ", 13', output: '"Mr%20John%20Smith"', explanation: "ভেতরের দুটি স্পেস '%20' দিয়ে প্রতিস্থাপিত হয়েছে।" }
      ],
      constraints: ["In-place সম্পাদন করতে শেষ থেকে পিছনের দিকে (Backwards) ট্রাভার্স করুন"],
      hints: [
        "💡 Hint 1: সামনে থেকে পরিবর্তন করতে গেলে পরের অক্ষরগুলোকে বারবার সরাতে হয়, যা O(n²) সময় নিতে পারে।",
        "💡 Hint 2: শেষ থেকে (backwards) লিখতে শুরু করলে কি কোনো অক্ষর ওভাররাইট হওয়ার ভয় থাকে?"
      ],
      approach: "প্রথমে স্পেসের সংখ্যা গুনে নিয়ে চূড়ান্ত দৈর্ঘ্য হিসাব করুন। তারপর আসল দৈর্ঘ্যের শেষ থেকে শুরু করে নতুন বাফারের শেষের দিকে অক্ষরগুলো বসাতে থাকুন। স্পেস পেলে '%', '2', '0' বসিয়ে ইনডেক্স ৩ ধাপ পিছিয়ে নিন।",
      solutions: [
        {
          language: "javascript",
          code: `function urlify(str, trueLen) {
  const chars = str.split("");
  let spaceCount = 0;
  for (let i = 0; i < trueLen; i++) {
    if (chars[i] === " ") spaceCount++;
  }
  let index = trueLen + spaceCount * 2;
  for (let i = trueLen - 1; i >= 0; i--) {
    if (chars[i] === " ") {
      chars[index - 1] = "0";
      chars[index - 2] = "2";
      chars[index - 3] = "%";
      index -= 3;
    } else {
      chars[index - 1] = chars[i];
      index--;
    }
  }
  return chars.join("");
}`,
          explanation: "Two-pointer backward scan নিশ্চিত করে O(n) সময় ও কোনো অপ্রয়োজনীয় স্থানান্তর নয়।"
        }
      ],
      complexity: { time: "O(n)", space: "O(1) in-place রূপান্তর" }
    },
    {
      id: "1.4",
      title: "Palindrome Permutation",
      banglaTitle: "প্যালিনড্রোম পারমিউটেশন",
      difficulty: "Medium",
      description: "একটি string দেওয়া হলে যাচাই করুন সেটির অক্ষরগুলোকে সাজিয়ে কোনো Palindrome তৈরি করা সম্ভব কিনা।",
      examples: [
        { input: '"Tact Coa"', output: "true", explanation: '"taco cat" বা "atco cta" ইত্যাদি প্যালিনড্রোম বানানো সম্ভব।' }
      ],
      constraints: ["Whitespace ও letter-casing ইগনোর করুন"],
      hints: [
        "💡 Hint 1: একটি প্যালিনড্রোমে সর্বোচ্চ কয়টি বিজোড় (odd) সংখ্যক অক্ষর থাকতে পারে?",
        "💡 Hint 2: জোড় দৈর্ঘ্যের ক্ষেত্রে সব অক্ষরের কাউন্ট জোড় হতে হবে; বিজোড় দৈর্ঘ্যের ক্ষেত্রে ঠিক একটি অক্ষর বিজোড় হতে পারবে।"
      ],
      approach: "একটি হ্যাশ টেবিল বা বিট ভেক্টর দিয়ে প্রতিটি অক্ষরের বিজোড়/জোড় অবস্থা ট্র্যাক করুন। স্ট্রিং শেষে সর্বোচ্চ একটি অক্ষরের ফ্রিকোয়েন্সি বিজোড় হতে পারে。",
      solutions: [
        {
          language: "javascript",
          code: `function isPalindromePermutation(phrase) {
  const charCounts = new Map();
  let cleanStr = phrase.toLowerCase().replace(/[^a-z0-9]/g, "");

  for (const c of cleanStr) {
    charCounts.set(c, (charCounts.get(c) || 0) + 1);
  }

  let oddCount = 0;
  for (const count of charCounts.values()) {
    if (count % 2 !== 0) oddCount++;
    if (oddCount > 1) return false;
  }
  return true;
}`,
          explanation: "বিজোড় ফ্রিকোয়েন্সির অক্ষর সর্বোচ্চ ১টি হলে প্যালিনড্রোম সম্ভব।"
        }
      ],
      complexity: { time: "O(n)", space: "O(c)" }
    }
  ],
  quiz: [
    {
      question: "একটি array-তে index দিয়ে কোনো element access করার time complexity কত?",
      options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
      correct: 1,
      explanation: "Array মেমোরিতে এলিমেন্টগুলোকে ধারাবাহিকভাবে (contiguously) রাখে, তাই যেকোনো index সরাসরি base_address + index × element_size ফর্মুলা দিয়ে হিসাব করা যায় — যার ফলে constant-time O(1) access পাওয়া যায়।"
    },
    {
      question: "Sorted array-তে pair খোঁজার O(n²) প্রবলেমকে কোন টেকনিক O(n)-এ রূপান্তর করে?",
      options: ["Binary search", "Two-pointer technique", "Divide and conquer", "Breadth-first search"],
      correct: 1,
      explanation: "Two-pointer technique-এ দুই প্রান্তে দুটি pointer রেখে ভেতরের দিকে সরানো হয়, যার মাধ্যমে এক pass-এই সব valid pair স্ক্যান করা সম্ভব — O(n)।"
    },
    {
      question: "এই কোডটির output কী হবে?\n\nlet s = '';\nfor (let i = 0; i < 4; i++) s += 'ab';\nconsole.log(s.length);",
      options: ["4", "6", "8", "2"],
      correct: 2,
      explanation: "'ab'-এর length হলো 2। Loop-এ ৪ বার concatenate করায় string-টি দাঁড়ায় 'abababab' → যার length হলো 8।"
    },
    {
      question: "কীভাবে O(n) টাইমে দুটি string anagram কিনা তা চেক করবেন?",
      options: [
        "দুটোই sort করে compare করে",
        "Character frequency map তুলনা করে",
        "Length আলাদা কিনা শুধু তা চেক করে",
        "একটি reverse করে compare করে"
      ],
      correct: 1,
      explanation: "প্রতিটি string-এর জন্য frequency map বানাতে O(n) সময় লাগে। Sort করলেও কাজ হবে কিন্তু তাতে O(n log n) সময় লাগবে। আর শুধু length চেক করা যথেষ্ট নয়।"
    },
    {
      question: "Dynamic array-তে append করার amortized time complexity কত?",
      options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
      correct: 1,
      explanation: "Dynamic array পূর্ণ হয়ে গেলে capacity দ্বিগুণ করে। বেশিরভাগ append-ই O(1); মাঝে মাঝে resize করতে O(n) লাগলেও n সংখ্যক অপারেশনের গড় করলে খরচ amortized O(1)-ই দাঁড়ায়।"
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = chapter01;
}
