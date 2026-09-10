/**
 * Chapter 02: Linked Lists
 */

const chapter02 = {
  id: 2,
  title: "Linked Lists",
  icon: "🔗",
  description: "Pointer নেভিগেশন, cycle detection, এবং in-place list manipulation আয়ত্ত করুন।",
  concepts: [
    {
      title: "Singly vs Doubly Linked Lists",
      content: "Singly linked list-এ একটি value এবং একটি next pointer থাকে। Doubly linked list-এ অতিরিক্ত একটি prev pointer থাকে, যার ফলে কোনো node-এর reference থাকলে O(1)-এ সেটিকে remove করা যায়। Linked list-এ O(1) random access পাওয়া যায় না, কিন্তু জানা পজিশনে O(1) insertion ও deletion করা যায়।",
      bigO: { access: "O(n)", search: "O(n)", insertAtHead: "O(1)", deleteAtHead: "O(1)", insertAtTail: "O(1) with tail pointer" },
      tips: [
        "সবসময় edge case-গুলো খেয়াল রাখুন: empty list, single node, এবং head/tail-এ অপারেশন।",
        "Head-এ insertion ও deletion লজিক সহজ করতে dummy/sentinel head node ব্যবহার করুন।",
        "কোড লেখার আগে pointer diagram এঁকে নিন — এতে বেশিরভাগ bug এড়ানো যায়।"
      ]
    },
    {
      title: "Runner (Fast & Slow Pointer) Technique",
      content: "ভিন্ন গতির দুটি pointer ব্যবহার করুন। Fast pointer ২ ধাপ এগোলে slow pointer ১ ধাপ এগোয়। Fast pointer যখন শেষে পৌঁছায়, slow pointer তখন ঠিক মাঝখানে থাকে। আর যদি list-এ cycle থাকে, তবে তারা একপর্যায়ে নিশ্চিতভাবে মিলিত হবে।",
      tips: [
        "Cycle detection: fast এবং slow pointer যদি মিলে যায়, তবে cycle বিদ্যমান (Floyd's algorithm)।",
        "Cycle start বের করা: cycle detect হওয়ার পর, একটি pointer-কে head-এ নিয়ে দুজনকে ১ ধাপ করে এগিয়ে দিন — তারা cycle entry-তে মিলিত হবে।",
        "Middle node খোঁজা: fast pointer শেষে পৌঁছালে slow pointer মাঝের node নির্দেশ করে।"
      ]
    },
    {
      title: "Common Linked List Operations",
      content: "In-place-এ linked list reverse করতে তিনটি pointer লাগে: prev, current, এবং next। দুটি sorted list merge করতে comparison-based পদ্ধতি ব্যবহার করা হয়, যা merge sort-এর merge step-এর মতো। কোনো ভ্যালুর ওপর ভিত্তি করে list partition করলে তা 'less than' এবং 'greater than or equal' সাবলিস্টে বিভক্ত হয়।",
      tips: [
        "Iteratively reverse করুন: next স্টোর করুন, current.next-কে prev নির্দেশ করান, তারপর prev ও current এগিয়ে নিন।",
        "Recursion দিয়েও reverse করা যায়, তবে এতে O(n) call stack স্পেস লাগে।",
        "'kth from end' প্রবলেমের জন্য k দূরত্বে রাখা দুটি pointer ব্যবহার করুন।"
      ]
    }
  ],
  problems: [
    {
      id: "2.1",
      title: "Remove Dups",
      banglaTitle: "ডুপ্লিকেট নোড অপসারণ",
      difficulty: "Easy",
      description: "একটি unsorted linked list থেকে সব duplicate নোড মুছে ফেলার কোড লিখুন। অতিরিক্ত বাফার (যেমন hash set) ব্যবহার করার অনুমতি না থাকলে কীভাবে সমাধান করবেন?",
      examples: [
        { input: "1 -> 2 -> 3 -> 2 -> 1 -> null", output: "1 -> 2 -> 3 -> null", explanation: "পুনরাবৃত্তি হওয়া মানগুলো বাদ দেওয়া হয়েছে।" }
      ],
      constraints: ["সিঙ্গলি লিংকড লিস্ট বিবেচনা করুন"],
      hints: [
        "💡 Hint 1: দেখা হয়ে যাওয়া মানগুলো মনে রাখার জন্য একটি Hash Set ব্যবহার করুন।",
        "💡 Hint 2: বাফার ছাড়া করতে হলে দুটি পয়েন্টার (current এবং runner) ব্যবহার করে O(n²) সময়ে সমাধান সম্ভব।"
      ],
      approach: "একটি Hash Set ব্যবহার করে লিস্ট ট্রাভার্স করুন। পরবর্তী নোডের মান সেটে থাকলে `current.next = current.next.next` করে স্কিপ করুন। বাফার নিষিদ্ধ হলে নেস্টেড লুপ চালিয়ে প্রতিটি নোডের সাপেক্ষে বাকিগুলো চেক করুন।",
      solutions: [
        {
          language: "javascript",
          code: `function removeDups(head) {
  if (!head) return null;
  const seen = new Set([head.val]);
  let current = head;

  while (current.next) {
    if (seen.has(current.next.val)) {
      current.next = current.next.next; // নোডটি বাইপাস করুন
    } else {
      seen.add(current.next.val);
      current = current.next;
    }
  }
  return head;
}`,
          explanation: "একবার ট্রাভার্সাল এবং O(1) সেট লুকআপের মাধ্যমে O(n) সময়ে সমাধান।"
        }
      ],
      complexity: { time: "O(n)", space: "O(n) হ্যাশ সেটের জন্য" }
    },
    {
      id: "2.2",
      title: "Return Kth to Last",
      banglaTitle: "শেষ থেকে K-তম নোড নির্ণয়",
      difficulty: "Medium",
      description: "একটি singly linked list-এর শেষ থেকে k-তম এলিমেন্টটি খুঁজে বের করার অ্যালগরিদম লিখুন।",
      examples: [
        { input: "1 -> 2 -> 3 -> 4 -> 5 -> null, k = 2", output: "4", explanation: "শেষ থেকে দ্বিতীয় নোড হলো ৪।" }
      ],
      constraints: ["k-এর মান সবসময় বৈধ এবং লিস্টের দৈর্ঘ্যের সমান বা কম"],
      hints: [
        "💡 Hint 1: যদি পুরো দৈর্ঘ্য জানা থাকে, তবে (length - k)-তম নোডই হলো উত্তর। কিন্তু এক পাসেই কি করা সম্ভব?",
        "💡 Hint 2: দুটি পয়েন্টার p1 এবং p2 নিন। p1-কে k ধাপ এগিয়ে দিন, তারপর দুজনকে একসাথে এগোন।"
      ],
      approach: "Two-pointer runner টেকনিক ব্যবহার করুন। প্রথম পয়েন্টারটিকে k ধাপ সামনে এগিয়ে দিন। এরপর উভয়ে ১ ধাপ করে এগোতে থাকুক। প্রথম পয়েন্টার যখন শেষে (null) পৌঁছাবে, দ্বিতীয় পয়েন্টারটি ঠিক শেষ থেকে k-তম নোডে অবস্থান করবে।",
      solutions: [
        {
          language: "javascript",
          code: `function kthToLast(head, k) {
  let p1 = head;
  let p2 = head;

  // p1-কে k ধাপ এগিয়ে দিন
  for (let i = 0; i < k; i++) {
    if (!p1) return null; // k দৈর্ঘ্যের চেয়ে বড় হলে
    p1 = p1.next;
  }

  // উভয়ে একসাথে শেষ পর্যন্ত এগোবে
  while (p1) {
    p1 = p1.next;
    p2 = p2.next;
  }

  return p2 ? p2.val : null;
}`,
          explanation: "একটি পাসেই O(n) টাইম ও O(1) স্পেসে সমাধান।"
        }
      ],
      complexity: { time: "O(n)", space: "O(1)" }
    },
    {
      id: "2.8",
      title: "Loop Detection",
      banglaTitle: "লুপ বা সাইকেল সনাক্তকরণ",
      difficulty: "Medium",
      description: "একটি circular linked list-এ লুপ আছে কিনা তা নির্ণয় করুন এবং লুপ শুরুর প্রথম নোডটি রিটার্ন করুন।",
      examples: [
        { input: "A -> B -> C -> D -> E -> C (একই C নোডে ফিরে আসে)", output: "C", explanation: "C নোডে লুপ শুরু হয়েছে।" }
      ],
      constraints: ["In-place এবং O(1) অতিরিক্ত স্পেস কাম্য"],
      hints: [
        "💡 Hint 1: Floyd's cycle detection algorithm (Fast & Slow pointer)-এর কথা চিন্তা করুন।",
        "💡 Hint 2: Fast ও Slow পয়েন্টার যখন লুপের ভেতর মিলিত হয়, একটি পয়েন্টারকে Head-এ ফিরিয়ে আনলে তাদের পরবর্তী মিলনস্থল কোথায় হবে?"
      ],
      approach: "Fast (২ ধাপ) ও Slow (১ ধাপ) পয়েন্টার চালান। তারা মিলিত হলে সাইকেল বিদ্যমান। এরপর একটি পয়েন্টারকে Head-এ রেখে উভয়ে ১ ধাপ করে এগোলে ঠিক লুপ শুরুর নোডটিতে দ্বিতীয়বার মিলিত হবে।",
      solutions: [
        {
          language: "javascript",
          code: `function findBeginning(head) {
  let slow = head;
  let fast = head;

  // ১. মিটিং পয়েন্ট খুঁজে বের করা
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }

  if (!fast || !fast.next) return null; // কোনো লুপ নেই

  // ২. লুপের প্রারম্ভিক নোড নির্ধারণ
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return fast; // লুপ শুরুর নোড
}`,
          explanation: "Floyd's cycle algorithm দিয়ে O(n) টাইম ও O(1) স্পেস।"
        }
      ],
      complexity: { time: "O(n)", space: "O(1)" }
    }
  ],
  quiz: [
    {
      question: "Singly linked list-এর kth element access করার time complexity কত?",
      options: ["O(1)", "O(k)", "O(n)", "O(log n)"],
      correct: 2,
      explanation: "Head থেকে node-by-node traverse করে যেতে হয়। Worst case-এ (k = n হলে) O(n) সময় লাগে।"
    },
    {
      question: "Floyd's cycle detection অ্যালগরিদমে pointer-গুলো কীভাবে মুভ করে?",
      options: [
        "উভয়েই একসাথে ১ ধাপ করে মুভ করে",
        "Fast মুভ করে ২ ধাপ, slow মুভ করে ১ ধাপ",
        "Fast মুভ করে ৩ ধাপ, slow মুভ করে ১ ধাপ",
        "তারা বিপরীত দিকে মুভ করে"
      ],
      correct: 1,
      explanation: "প্রতিটি iteration-এ fast pointer ২ node এবং slow pointer ১ node এগোয়। Cycle থাকলে তারা অবশ্যই cycle-এর ভেতরে এক জায়গায় মিলিত হবে।"
    },
    {
      question: "Singly linked list-কে iteratively reverse করতে কয়টি pointer প্রয়োজন?",
      options: ["1", "2", "3", "4"],
      correct: 2,
      explanation: "তিনটি pointer লাগে: prev (শুরুতে null), current (শুরুতে head), এবং next (reassign করার আগে current.next সাময়িকভাবে ধরে রাখার জন্য)।"
    },
    {
      question: "Dummy (Sentinel) head node ব্যবহারের প্রধান সুবিধা কী?",
      options: [
        "মেমোরি খরচ ৫০% কমে যায়",
        "Head-এ insertion এবং deletion-এর edge cases হ্যান্ডেল করা সহজ হয়",
        "Time complexity O(n) থেকে O(1) হয়ে যায়",
        "Cycle স্বয়ংক্রিয়ভাবে রিমুভ হয়ে যায়"
      ],
      correct: 1,
      explanation: "Dummy node থাকলে head-এর পূর্ববর্তী নোড সবসময় বিদ্যমান থাকে, ফলে empty list বা head পরিবর্তন সংক্রান্ত বিশেষ শর্ত লিখতে হয় না।"
    },
    {
      question: "Doubly linked list-এ কোনো node-এর reference দেওয়া থাকলে সেটিকে ডিলিট করতে কত সময় লাগে?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correct: 2,
      explanation: "যেহেতু prev এবং next উভয়ের পয়েন্টার নোডেই উপস্থিত থাকে, তাই node.prev.next = node.next এবং node.next.prev = node.prev করে O(1)-এ সরানো যায়।"
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = chapter02;
}
