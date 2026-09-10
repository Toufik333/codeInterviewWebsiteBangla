/**
 * Chapter 09: Sorting & Searching
 */

const chapter09 = {
  id: 9,
  title: "Sorting & Searching",
  icon: "🔍",
  description: "Comparison sorts, binary search variants, এবং সঠিক অ্যালগরিদম বেছে নেওয়ার কৌশল।",
  concepts: [
    {
      title: "Comparison-Based Sorting",
      content: "তুলনাভিত্তিক সর্টিংয়ের তাত্ত্বিক সর্বনিম্ন সীমা হলো Ω(n log n)। Merge sort সবসময় O(n log n) নিশ্চয়তা দেয় তবে O(n) অতিরিক্ত স্পেস নেয়। Quicksort গড়ে O(n log n) এবং O(1) স্পেস নিলেও worst-case-এ O(n²) হতে পারে। Heapsort সব ক্ষেত্রেই O(n log n) এবং O(1) স্পেস ব্যবহার করে।",
      bigO: {
        mergeSort: "O(n log n) time, O(n) space",
        quickSort: "O(n log n) avg, O(n²) worst, O(log n) space",
        heapSort: "O(n log n) time, O(1) space"
      },
      tips: [
        "Merge sort হলো stable (সমান মানের উপাদানের আপেক্ষিক ক্রম বজায় রাখে); Quicksort সাধারণত stable নয়।",
        "খারাপ pivot নির্বাচনের কারণে already-sorted ইনপুটে Quicksort-এর worst-case ঘটে — তাই random pivot ব্যবহার করুন।",
        "প্রায় সাজানো (nearly sorted) ডেটায় Insertion sort O(n) সময়ে কাজ করে — Timsort-এ এটি সাবরুটিন হিসেবে ব্যবহৃত হয়।"
      ]
    },
    {
      title: "Non-Comparison Sorts",
      content: "Counting sort, radix sort, এবং bucket sort ডেটার বিশেষত্বকে কাজে লাগিয়ে O(n log n)-এর সীমাকে ছাড়িয়ে যায়। Counting sort O(n + k) সময়ে চলে, যেখানে k হলো মানের রেঞ্জ। Radix sort ডিজিট ধরে ধরে প্রসেস করে O(d × (n + k)) সময়ে চলে, যেখানে d হলো ডিজিটের সংখ্যা।",
      tips: [
        "সংখ্যার রেঞ্জ যখন ছোট এবং জানা থাকে, তখন Counting sort ব্যবহার করুন।",
        "নির্দিষ্ট দৈর্ঘ্যের integer বা string-এর জন্য Radix sort দারুণ কাজ করে।",
        "Bucket sort উপাদানগুলোকে বালতিতে ভাগ করে প্রতিটি আলাদাভাবে সর্ট করে জুড়ে দেয় — ইউনিফর্ম ডেটার জন্য গড় সময় O(n)।"
      ]
    },
    {
      title: "Binary Search & Variants",
      content: "Binary search একটি sorted array-তে O(log n) সময়ে লক্ষ্যবস্তু খুঁজে বের করে। এর ভ্যারিয়েন্টগুলোর মধ্যে রয়েছে: first/last occurrence বের করা, rotated sorted array-তে খোঁজা, এবং insertion point (lower/upper bound) নির্ণয় করা। প্রতি ধাপে সার্চ স্পেস অর্ধেক করে ফেলাই এর মূল শক্তি।",
      tips: [
        "Integer overflow এড়াতে mid = lo + (hi - lo) / 2 এবং lo <= hi ব্যবহার করুন।",
        "'First occurrence'-এর ক্ষেত্রে এলিমেন্ট পাওয়ার পরও বামে সার্চ চালিয়ে যান (hi = mid - 1)।",
        "Binary search on the answer: উত্তর যদি monotonic আচরণ করে, তবে সরাসরি ভ্যালু স্পেসের ওপর binary search চালান।"
      ]
    }
  ],
  problems: [
    {
      id: "9.1",
      title: "Sorted Merge",
      banglaTitle: "দুটি সাজানো অ্যারে মার্জ করা",
      difficulty: "Easy",
      description: "দুটি সাজানো অ্যারে A এবং B দেওয়া আছে। A-এর শেষে B ধারণ করার মতো পর্যাপ্ত খালি বাফার রয়েছে। B-কে A-এর ভেতর সর্টেড অবস্থায় মার্জ করুন।",
      examples: [
        { input: "A = [1, 3, 5, 0, 0, 0], B = [2, 4, 6]", output: "A = [1, 2, 3, 4, 5, 6]", explanation: "শেষের খালি জায়গায় উপাদানগুলো যথাযথ স্থানে সন্নিবেশিত হয়েছে।" }
      ],
      constraints: ["A-এর আকার m + n এবং B-এর আকার n"],
      hints: [
        "💡 Hint 1: সামনে থেকে শুরু করলে উপাদানগুলোকে বারবার ডানে সরাতে হয়।",
        "💡 Hint 2: শেষের ফাঁকা স্থান থেকে পিছনের দিকে (Backwards) বৃহত্তম উপাদানটি বসানো শুরু করলে কোনো উপাদান ওভাররাইট হবে না।"
      ],
      approach: "তিনটি পয়েন্টার ব্যবহার করুন: `lastA = m - 1`, `lastB = n - 1`, এবং `mergedIndex = m + n - 1`। শেষ দিক থেকে A এবং B-এর মধ্যে যেটি বড় সেটিকে `mergedIndex`-এ বসিয়ে পয়েন্টার এক ধাপ কমিয়ে নিন।",
      solutions: [
        {
          language: "javascript",
          code: `function sortedMerge(a, b, m, n) {
  let indexA = m - 1;
  let indexB = n - 1;
  let mergedIndex = m + n - 1;

  while (indexB >= 0) {
    if (indexA >= 0 && a[indexA] > b[indexB]) {
      a[mergedIndex] = a[indexA];
      indexA--;
    } else {
      a[mergedIndex] = b[indexB];
      indexB--;
    }
    mergedIndex--;
  }
  return a;
}`,
          explanation: "পেছন থেকে সর্টিং নিশ্চিত করে O(1) অতিরিক্ত মেমোরিতে O(m + n) সময়ের মার্জ।"
        }
      ],
      complexity: { time: "O(m + n)", space: "O(1) in-place" }
    },
    {
      id: "9.3",
      title: "Search in Rotated Array",
      banglaTitle: "রোটেটেড সর্টেড অ্যারেতে সন্ধান",
      difficulty: "Medium",
      description: "একটি ক্রমান্বয়ে সাজানো অ্যারে কোনো একটি পিভট পয়েন্টে আবর্তিত (rotated) করা হয়েছে। এই অ্যারেতে একটি নির্দিষ্ট সংখ্যা O(log n) সময়ে খুঁজে বের করুন।",
      examples: [
        { input: "nums = [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14], target = 5", output: "Index 8", explanation: "৫ সংখ্যাটি ইনডেক্স ৮-এ অবস্থিত।" }
      ],
      constraints: ["অ্যারেতে স্বতন্ত্র উপাদান রয়েছে"],
      hints: [
        "💡 Hint 1: অ্যারেটিকে দুই ভাগে ভাগ করলে যেকোনো এক পাশ নিশ্চিতভাবে স্বাভাবিকভাবে সর্টেড থাকবে।",
        "💡 Hint 2: যদি nums[left] <= nums[mid] হয়, তবে বাম পাশ সর্টেড। টার্গেট কি সেই রেঞ্জের মধ্যে পড়ে কিনা তা চেক করে সিদ্ধান্ত নিন।"
      ],
      approach: "Modified Binary Search চালান। প্রতি পদক্ষেপে mid বের করুন। যদি `nums[left] <= nums[mid]` হয়, তবে বাম অর্ধ সর্টেড। তখন টার্গেট `[nums[left], nums[mid]]`-এর ভেতর থাকলে ডানে সার্চ স্পেস কমান (`right = mid - 1`), অন্যথায় বামে বাড়ান। একই যুক্তি ডান অর্ধের জন্যও প্রযোজ্য।",
      solutions: [
        {
          language: "javascript",
          code: `function searchRotated(nums, target) {
  let left = 0, right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;

    // বাম অর্ধ কি সর্টেড?
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // ডান অর্ধ সর্টেড
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}`,
          explanation: "প্রতি ধাপে সার্চ স্পেস অর্ধেক করায় O(log n) সময়ে সমাধান।"
        }
      ],
      complexity: { time: "O(log n)", space: "O(1)" }
    }
  ],
  quiz: [
    {
      question: "Comparison-based sorting-এর তাত্ত্বিক lower bound কত?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correct: 1,
      explanation: "Decision tree বিশ্লেষণের মাধ্যমে প্রমাণিত যে যেকোনো তুলনাভিত্তিক সর্টকে worst case-এ কমপক্ষে Ω(n log n) সংখ্যক তুলনা করতেই হবে।"
    },
    {
      question: "ডিফল্টভাবে নিচের কোন সর্টিং অ্যালগরিদমটি stable নয়?",
      options: ["Merge sort", "Insertion sort", "Quicksort", "Bubble sort"],
      correct: 2,
      explanation: "Quicksort পার্টিশনের সময় সমান উপাদানগুলোকে একে অপরের ওপাশে সোয়াপ করতে পারে, যা stability নষ্ট করে। Merge sort, insertion sort, এবং bubble sort সবাই stable।"
    },
    {
      question: "Binary search-এ integer overflow এড়াতে mid হিসাব করার সঠিক উপায় কোনটি?",
      options: [
        "(lo + hi) / 2",
        "lo + (hi - lo) / 2",
        "(lo + hi) >> 2",
        "hi - lo / 2"
      ],
      correct: 1,
      explanation: "lo এবং hi উভয়ে বড় সংখ্যা হলে (lo + hi) ওভারফ্লো হতে পারে। lo + (hi - lo) / 2 লিখলে এই ঝুঁকি পুরোপুরি এড়ানো যায়।"
    },
    {
      question: "Merge sort-এর space complexity কত?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correct: 2,
      explanation: "Merge করার সময় সাময়িক array তৈরি করার জন্য Merge sort-এর O(n) অতিরিক্ত (auxiliary) মেমোরি প্রয়োজন হয়।"
    },
    {
      question: "Comparison-based sort-এর চেয়ে Counting sort কখন বেশি লাভজনক?",
      options: [
        "যখন ডেটা আগে থেকেই সাজানো থাকে",
        "যখন n-এর তুলনায় মানের সীমা (range) যথেষ্ট ছোট থাকে",
        "যখন মেমোরি খুব সীমিত থাকে",
        "যখন উপাদানগুলো স্ট্রিং হয়"
      ],
      correct: 1,
      explanation: "Counting sort O(n + k) সময়ে চলে যেখানে k হলো রেঞ্জ। n-এর তুলনায় k ছোট হলে এটি O(n log n) সর্টকে অনায়াসেই হারিয়ে দেয়।"
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = chapter09;
}
