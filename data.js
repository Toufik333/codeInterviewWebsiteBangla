/**
 * CTCI Study App — Chapter Data (Bangla Version)
 * 10 chapters, each with key concepts and a 5-question quiz.
 */

const CHAPTERS = [
  // ─── Chapter 1: Arrays & Strings ──────────────────────────────
  {
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
  },

  // ─── Chapter 2: Linked Lists ──────────────────────────────────
  {
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
        question: "Singly linked list-এর তুলনায় Doubly linked list-এর প্রধান সুবিধা কোনটি?",
        options: [
          "O(1) random access পাওয়া যায়",
          "মেমোরি কম খরচ হয়",
          "Head traversal ছাড়াই নির্দিষ্ট node-কে O(1)-এ delete করা যায়",
          "দ্রুত sort করা সম্ভব"
        ],
        correct: 2,
        explanation: "Prev এবং next উভয় pointer থাকায়, নির্দিষ্ট node-এর reference থাকলে head থেকে traverse করে আগের node খোঁজা ছাড়াই O(1)-এ তাকে unlink করা যায়।"
      },
      {
        question: "Linked list কোডে 'dummy head' নোড ব্যবহার করলে কী সুবিধা পাওয়া যায়?",
        options: [
          "Sorting অ্যালগরিদম সহজ হয়",
          "Head-এ insertion/deletion সংক্রান্ত edge case সহজ হয়ে যায়",
          "Memory allocation কমে যায়",
          "Cycle detection দ্রুত হয়"
        ],
        correct: 1,
        explanation: "আসল head-এর আগে একটি dummy (sentinel) node রাখলে head-এ insert বা delete করার জন্য আলাদা কোনো স্পেশাল কোড লিখতে হয় না, কারণ তখন প্রতিটি নোডেরই একটি predecessor থাকে।"
      }
    ]
  },

  // ─── Chapter 3: Stacks & Queues ───────────────────────────────
  {
    id: 3,
    title: "Stacks & Queues",
    icon: "📚",
    description: "LIFO এবং FIFO স্ট্রাকচার — balanced brackets থেকে শুরু করে BFS traversal পর্যন্ত।",
    concepts: [
      {
        title: "Stack (LIFO)",
        content: "Stack চলে Last-In-First-Out নিয়মে। Push এবং pop উভয় অপারেশনই top-এ ঘটে এবং O(1) টাইমে চলে। Function call chain (call stack), undo সিস্টেম, এবং expression evaluation মডেলে Stack স্বাভাবিকভাবেই ব্যবহৃত হয়।",
        bigO: { push: "O(1)", pop: "O(1)", peek: "O(1)", search: "O(n)" },
        tips: [
          "Parentheses/brackets ম্যাচিংয়ে stack ব্যবহার করুন: opener পেলে push, closer পেলে pop করে match চেক করুন।",
          "Monotonic stacks দিয়ে 'next greater element' এবং histogram সংক্রান্ত প্রবলেম নিখুঁতভাবে সলভ করা যায়।",
          "Running minimum ট্র্যাক করার জন্য একটি parallel stack রেখে min-stack তৈরি করা যায়।"
        ]
      },
      {
        title: "Queue (FIFO)",
        content: "Queue চলে First-In-First-Out নিয়মে। Enqueue পেছনে যুক্ত করে এবং dequeue সামনে থেকে বের করে — linked list বা circular buffer দিয়ে উভয়ই O(1)-এ করা যায়। BFS traversal এবং level-order প্রসেসিংয়ে Queue অপরিহার্য।",
        bigO: { enqueue: "O(1)", dequeue: "O(1)", peek: "O(1)", search: "O(n)" },
        tips: [
          "Graph এবং Tree-তে level by level নোড explore করতে BFS-এ queue ব্যবহার করা হয়।",
          "Deque (double-ended queue)-এ উভয় প্রান্তেই O(1) অপারেশন সাপোর্ট করে।",
          "দুটি stack দিয়ে queue তৈরি করা যায়: একটি enqueue-এর জন্য, অন্যটি dequeue-এর জন্য — প্রতি অপারেশনে amortized O(1)।"
        ]
      },
      {
        title: "Classic Problems",
        content: "গুরুত্বপূর্ণ ইন্টারভিউ প্রবলেমগুলোর মধ্যে রয়েছে: stack ব্যবহার করে queue বানানো, অন্য একটি মাত্র stack দিয়ে stack sort করা, O(1)-এ minimum element রিটার্ন করার মতো stack ডিজাইন করা, এবং postfix (Reverse Polish Notation) evaluate করা।",
        tips: [
          "Two stacks দিয়ে queue: stack1-এ push করুন; dequeue-এর সময় stack2 খালি থাকলে stack1-এর সব stack2-তে ঢালুন, তারপর stack2 থেকে pop করুন।",
          "Stack sort করা: input stack থেকে বারবার pop করুন এবং এলিমেন্টগুলোকে সাময়িকভাবে সরিয়ে sorted stack-এ সঠিক জায়গায় বসান।",
          "Priority queue (heap) হলো queue-এর আরও শক্তিশালী রূপ — কখন এটি ব্যবহার করতে হবে তা জেনে রাখুন।"
        ]
      }
    ],
    quiz: [
      {
        question: "কোন data structure LIFO (Last-In-First-Out) অর্ডার মেনে চলে?",
        options: ["Queue", "Stack", "Linked List", "Hash Map"],
        correct: 1,
        explanation: "Stack হলো LIFO — অর্থাৎ সবার শেষে যোগ করা এলিমেন্টটিই সবার আগে বের হয়।"
      },
      {
        question: "কোন traversal অ্যালগরিদম queue-এর ওপর নির্ভর করে?",
        options: ["Depth-First Search", "Breadth-First Search", "Binary Search", "Quicksort"],
        correct: 1,
        explanation: "BFS গভীরে যাওয়ার আগে বর্তমান depth-এর সব প্রতিবেশী নোড explore করে, যার জন্য সঠিক অর্ডারে নোডগুলো প্রসেস করতে FIFO queue প্রয়োজন।"
      },
      {
        question: "দুটি stack দিয়ে কীভাবে amortized O(1) dequeue সম্পন্ন করা যায়?",
        options: [
          "Stack1-এ push করুন; dequeue করতে stack1 থেকে pop করুন",
          "Stack1-এ push করুন; dequeue করতে stack2 খালি থাকলে stack1-এর সব stack2-তে নিয়ে যান, তারপর stack2 থেকে pop করুন",
          "একসাথে উভয় stack-এই push করুন",
          "Odd এলিমেন্টের জন্য একটি stack এবং even-এর জন্য অন্যটি ব্যবহার করুন"
        ],
        correct: 1,
        explanation: "এলিমেন্টগুলো stack1 থেকে stack2-তে কেবল তখনই যায় যখন stack2 পুরোপুরি খালি থাকে। প্রতিটি এলিমেন্ট সর্বোচ্চ একবারই মুভ হয়, তাই প্রতি dequeue-তে amortized cost দাঁড়ায় O(1)।"
      },
      {
        question: "এই stack-ভিত্তিক কোডটির রিটার্ন ভ্যালু কী হবে?\n\nstack = []\nfor ch in '({[]})':\n  if ch in '({[':\n    stack.append(ch)\n  else:\n    stack.pop()\nprint(len(stack))",
        options: ["0", "3", "6", "1"],
        correct: 0,
        explanation: "'({[]})' স্ট্রিংটি সুষম (balanced)। '(' '{' '[' স্ট্যাক-এ push হয় (৩টি আইটেম), এরপর ']' '}' ')' প্রতিটির জন্য একবার করে pop হয় → stack একদম খালি হয়ে যায় → length 0।"
      },
      {
        question: "Min-stack-এ O(1)-এ getMin() সাপোর্ট করে। এটি সাধারণত কীভাবে implement করা হয়?",
        options: [
          "প্রতিটি push-এর পর stack sort করে",
          "দ্বিতীয় আরেকটি stack বজায় রেখে যা running minimum ট্র্যাক করে",
          "শুধুমাত্র একটি আলাদা ভ্যারিয়েবলে minimum স্টোর করে",
          "Stack-এর সাথে একটি heap ব্যবহার করে"
        ],
        correct: 1,
        explanation: "একটি সমান্তরাল (parallel) stack প্রতিটি লেভেলের বর্তমান minimum ধরে রাখে। যখনই কোনো ভ্যালু push করা হয়, min(new_value, current_min)-ও min stack-এ push করা হয়। Pop করার সময় দুটি থেকেই একসাথে pop করা হয়।"
      }
    ]
  },

  // ─── Chapter 4: Trees & Graphs ────────────────────────────────
  {
    id: 4,
    title: "Trees & Graphs",
    icon: "🌳",
    description: "Binary trees, BST, graph traversals, এবং shortest path অ্যালগরিদম।",
    concepts: [
      {
        title: "Binary Trees",
        content: "একটি binary tree-তে প্রতি নোডে সর্বোচ্চ দুটি child থাকতে পারে। প্রধান traversals: in-order (left, root, right), pre-order (root, left, right), post-order (left, right, root), এবং level-order (BFS)। Complete binary tree-র শেষ লেভেল ছাড়া বাকি সব লেভেল পূর্ণ থাকে এবং শেষ লেভেল বাম থেকে ডানে পূর্ণ হয়।",
        bigO: { traversal: "O(n)", height: "O(log n) balanced / O(n) skewed" },
        tips: [
          "BST-এর In-order traversal করলে sorted output পাওয়া যায়।",
          "Tree serialize এবং deserialize করতে Pre-order খুব উপযোগী।",
          "Height-balanced tree (যেমন AVL, Red-Black) O(log n) অপারেশনের নিশ্চয়তা দেয়।"
        ]
      },
      {
        title: "Binary Search Trees (BST)",
        content: "একটি BST নিশ্চিত করে: প্রতিটি নোডের জন্য left child < parent < right child। এর ফলে balanced tree-তে O(log n)-এ search, insert, এবং delete করা যায়। তবে unbalanced BST খারাপ হতে হতে O(n)-এ নেমে আসে — যা কার্যত একটি linked list-এর মতো আচরণ করে।",
        bigO: { search: "O(log n) avg", insert: "O(log n) avg", delete: "O(log n) avg", worstCase: "O(n)" },
        tips: [
          "শুধু সরাসরি children চেক না করে, recursively min/max bounds পাস করে BST validate করুন।",
          "কোনো নোডের successor হলো তার right subtree-র leftmost নোড।",
          "Self-balancing ভ্যারিয়েন্টগুলো (AVL, Red-Black) সচরাচর ইন্টারভিউতে কোড করতে হয় না, তবে তাদের rotation কনসেপ্ট পরিষ্কার থাকা দরকার।"
        ]
      },
      {
        title: "Heaps & Tries",
        content: "Min-heap হলো একটি complete binary tree যেখানে প্রতিটি parent ≤ তার children। Insert এবং extract-min অপারেশন O(log n)। একটি array-কে O(n)-এ heapify করা যায়। Trie (prefix tree) ক্যারেক্টার অনুযায়ী string স্টোর করে, যা O(L) সময়ে prefix lookup দেয় (যেখানে L হলো string-এর দৈর্ঘ্য)।",
        tips: [
          "Top-K প্রবলেম, median finding (দুটি heap দিয়ে), এবং priority scheduling-এ heap ব্যবহার করুন।",
          "Autocomplete, spell-check, এবং IP routing-এ Trie চমৎকার ভূমিকা রাখে।",
          "Array দিয়ে heap implement করা যায়: i তম index-এর children থাকে 2i+1 এবং 2i+2 index-এ।"
        ]
      },
      {
        title: "Graph Traversals & Algorithms",
        content: "Graph গঠিত হয় vertices এবং edges (directed বা undirected) নিয়ে। DFS স্ট্যাক (বা recursion) ব্যবহার করে ব্যাকট্র্যাকিংয়ের আগে যত দূর সম্ভব গভীরে যায়। BFS কিউ ব্যবহার করে লেভেল বাই লেভেল explore করে। Dijkstra's algorithm প্রায়োরিটি কিউ ব্যবহার করে non-negative edge যুক্ত weighted graph-এ shortest path বের করে।",
        bigO: { DFS: "O(V + E)", BFS: "O(V + E)", Dijkstra: "O((V + E) log V)" },
        tips: [
          "Sparse graph-এর জন্য adjacency list এবং dense graph-এর জন্য adjacency matrix ব্যবহার করুন।",
          "Cycle detection: undirected graph-এ DFS-এ back-edge থাকার অর্থ cycle আছে; directed graph-এ visiting/visited state ট্র্যাক করুন।",
          "Topological sort কেবল DAG-এর ক্ষেত্রে প্রযোজ্য — Kahn's algorithm (BFS) অথবা finish-time ordering সহ DFS ব্যবহার করুন।"
        ]
      }
    ],
    quiz: [
      {
        question: "BST-এর কোন traversal এলিমেন্টগুলোকে sorted অর্ডারে প্রদর্শন করে?",
        options: ["Pre-order", "Post-order", "In-order", "Level-order"],
        correct: 2,
        explanation: "In-order traversal প্রথমে left subtree, এরপর root, এবং শেষে right subtree ভিজিট করে। BST-এর ক্ষেত্রে এটি ascending sorted order দেয়।"
      },
      {
        question: "V সংখ্যক vertices এবং E সংখ্যক edges বিশিষ্ট একটি graph-এ BFS-এর time complexity কত?",
        options: ["O(V²)", "O(V + E)", "O(E log V)", "O(V log V)"],
        correct: 1,
        explanation: "BFS প্রতিটি vertex একবার ভিজিট করে এবং প্রতিটি edge একবার পরীক্ষা করে, যার ফলে time complexity হয় O(V + E)।"
      },
      {
        question: "কীভাবে একটি Binary Search Tree সঠিকভাবে validate করবেন?",
        options: [
          "প্রতিটি নোডের value > left child এবং < right child কিনা শুধু তা চেক করে",
          "Recursively min/max bounds পাস করে নিশ্চিত হওয়া যে প্রতিটি নোড তার valid সীমার মধ্যে আছে",
          "Level-order traversal চালিয়ে তা sorted কিনা পরীক্ষা করে",
          "Tree-টিকে তার mirror-এর সাথে তুলনা করে"
        ],
        correct: 1,
        explanation: "শুধু সরাসরি children চেক করলে গভীরে থাকা কোনো নোড পূর্বপুরুষদের (ancestors) নিয়ম ভঙ্গ করলে তা ধরা পড়ে না। উপর থেকে min/max bounds পাস করে গেলে প্রতিটি নোড তার সমস্ত ancestors-এর সাপেক্ষে valid থাকে।"
      },
      {
        question: "Array দিয়ে তৈরি min-heap-এ index i-তে থাকা এলিমেন্টের children কোথায় থাকে?",
        options: ["i-1 এবং i-2", "2i এবং 2i+1", "2i+1 এবং 2i+2", "i/2 এবং i/2+1"],
        correct: 2,
        explanation: "0-based indexing-এ left child থাকে 2i + 1 এবং right child থাকে 2i + 2 নম্বরে। আর index i-এর parent থাকে floor((i - 1) / 2) নম্বরে।"
      },
      {
        question: "Non-negative edge weight বিশিষ্ট weighted graph-এ shortest path বের করতে কোন অ্যালগরিদম ব্যবহৃত হয়?",
        options: ["DFS", "BFS", "Dijkstra's algorithm", "Topological sort"],
        correct: 2,
        explanation: "Dijkstra's algorithm একটি priority queue ব্যবহার করে greedily সবচেয়ে কাছের unvisited vertex expand করে, যা non-negative edge weight থাকলে shortest path নিশ্চিত করে।"
      }
    ]
  },

  // ─── Chapter 5: Bit Manipulation ──────────────────────────────
  {
    id: 5,
    title: "Bit Manipulation",
    icon: "🔢",
    description: "Binary operations, bit tricks, এবং space-efficient সলিউশনের জন্য bitmask patterns।",
    concepts: [
      {
        title: "Bitwise Operators",
        content: "মূল ছয়টি অপারেটর: AND (&), OR (|), XOR (^), NOT (~), left shift (<<), right shift (>>)। AND দিয়ে bit mask করা হয়, OR দিয়ে bit set করা হয়, XOR দিয়ে bit toggle এবং পার্থক্য নির্ণয় করা হয়। Left shift কোনো সংখ্যাকে দ্বিগুণ করে; right shift অর্ধেক করে।",
        tips: [
          "x & 1 দিয়ে x সংখ্যাটি odd (বিজোড়) কিনা তা চেক করা যায়।",
          "x & (x - 1) সর্বনিম্ন set bit-কে clear করে — set bit গুনতে এটি বহুল ব্যবহৃত।",
          "x ^ x = 0 এবং x ^ 0 = x — XOR নিজেই নিজের inverse।"
        ]
      },
      {
        title: "Common Bit Tricks",
        content: "কোনো সংখ্যা ২-এর power কিনা চেক করতে: x > 0 && (x & (x - 1)) === 0। Temp variable ছাড়া দুটি সংখ্যা swap করতে XOR ব্যবহার করুন: a ^= b; b ^= a; a ^= b। বারবার lowest set bit clear করে Hamming weight (set bit-এর সংখ্যা) গণনা করা যায়।",
        tips: [
          "i-তম bit পেতে: (num >> i) & 1।",
          "i-তম bit set করতে: num | (1 << i)।",
          "i-তম bit clear করতে: num & ~(1 << i)।"
        ]
      },
      {
        title: "Bitmask DP & Applications",
        content: "ছোট সেটের (n ≤ 20) subset-কে integer দিয়ে প্রকাশ করতে Bitmask ব্যবহৃত হয়। প্রতিটি bit কোনো এলিমেন্টের উপস্থিতি বা অনুপস্থিতি নির্দেশ করে। এটি O(2ⁿ) স্পেসে subset enumeration এবং dynamic programming করতে সাহায্য করে।",
        tips: [
          "Travelling Salesman Problem-এ bitmask DP ব্যবহৃত হয়: dp[visited_mask][current_city]।",
          "একটি mask m-এর সকল subset বের করতে: for (let s = m; s > 0; s = (s - 1) & m)।",
          "Permission systems, feature flags, এবং board game states হ্যান্ডেল করতে Bitmasks দারুণ উপযোগী।"
        ]
      }
    ],
    quiz: [
      {
        question: "`n & (n - 1)` এক্সপ্রেশনটি কী করে?",
        options: [
          "Lowest bit-কে set করে",
          "Lowest set bit-কে clear করে",
          "সব bit উল্টে দেয়",
          "Highest set bit রিটার্ন করে"
        ],
        correct: 1,
        explanation: "n - 1 সর্বনিম্ন set bit এবং তার ডানের সব bit উল্টে দেয়। ফলে n-এর সাথে AND করলে ঠিক সর্বনিম্ন set bit-টি 0 (clear) হয়ে যায়।"
      },
      {
        question: "কোনো সংখ্যা ২-এর power (ঘাত) কিনা তা কীভাবে চেক করবেন?",
        options: [
          "n % 2 === 0",
          "n > 0 && (n & (n - 1)) === 0",
          "n & 1 === 0",
          "(n >> 1) === n / 2"
        ],
        correct: 1,
        explanation: "২-এর power এমন সংখ্যার বাইনারিতে ঠিক একটি মাত্র 1 (set bit) থাকে। n & (n - 1) করলে সেটি মুছে 0 হয়ে যায়। আর 0 বাদ দেওয়ার জন্য n > 0 চেক করা হয়।"
      },
      {
        question: "5 ^ 5-এর ফলাফল কী হবে?",
        options: ["5", "10", "0", "25"],
        correct: 2,
        explanation: "যেকোনো সংখ্যাকে তার নিজের সাথে XOR করলে ফলাফল 0 হয়। বাইনারিতে 5 হলো 101; 101 ^ 101 = 000 = 0।"
      },
      {
        question: "একটি সংখ্যা n-এর ৩য় bit (0-indexed) বের করতে কোনটি ব্যবহার করবেন?",
        options: ["n & 3", "(n >> 3) & 1", "n | (1 << 3)", "n ^ 3"],
        correct: 1,
        explanation: "Right-shift by 3 করলে ৩য় bit-টি 0 পজিশনে চলে আসে, তারপর 1 দিয়ে AND করলে ওই নির্দিষ্ট bit-এর মান (0 বা 1) পাওয়া যায়।"
      },
      {
        question: "বাইনারিতে 6 & 3-এর মান কত?",
        options: ["7 (111)", "2 (010)", "5 (101)", "1 (001)"],
        correct: 1,
        explanation: "6 = 110, 3 = 011। Bitwise AND করলে: 110 & 011 = 010 = 2।"
      }
    ]
  },

  // ─── Chapter 6: Math & Logic Puzzles ──────────────────────────
  {
    id: 6,
    title: "Math & Logic Puzzles",
    icon: "🧩",
    description: "Prime numbers, combinatorics, probability, এবং brain-teaser ট্যাকটিক্স।",
    concepts: [
      {
        title: "Prime Numbers & Divisibility",
        content: "মৌলিক সংখ্যার (prime) ঠিক দুটি গুণনীয়ক থাকে: ১ এবং সেই সংখ্যা নিজে। √n পর্যন্ত সংখ্যা দিয়ে ভাগ করে primality টেস্ট করা যায়। Sieve of Eratosthenes দিয়ে O(n log log n) টাইমে n পর্যন্ত সব prime বের করা যায়। ১-এর চেয়ে বড় প্রতিটি পূর্ণসংখ্যার একটি অনন্য prime factorization রয়েছে।",
        tips: [
          "n prime কিনা যাচাই করতে কেবল ২ থেকে √n পর্যন্ত চেক করলেই চলে।",
          "n পর্যন্ত সব prime দ্রুততম উপায়ে খুঁজে পেতে Sieve of Eratosthenes ব্যবহার করুন।",
          "Euclidean algorithm দিয়ে GCD নির্ণয়: gcd(a, b) = gcd(b, a % b), যতক্ষণ না b = 0 হয়।"
        ]
      },
      {
        title: "Counting & Probability",
        content: "Permutations (বিন্যাস): ক্রম বিবেচনা করে বাছাই করার জন্য n! / (n-r)!। Combinations (সমাবেশ): ক্রমহীন নির্বাচনের জন্য n! / (r!(n-r)!)। Probability = অনুকূল ফলাফল / মোট ফলাফল। স্বাধীন ঘটনার জন্য সম্ভাবনা গুণ করুন; পরস্পর বর্জনশীল ঘটনার জন্য যোগ করুন।",
        tips: [
          "পূরক সম্ভাবনা (complementary counting) ব্যবহার করুন: P(কমপক্ষে একটি) = 1 - P(একটিও নয়)।",
          "Pascal's triangle কম্বিনেশনের মান দেয়: C(n,k) = C(n-1,k-1) + C(n-1,k)।",
          "Expected value = Σ (ফলাফল × সম্ভাবনা) — average-case বিশ্লেষণের জন্য যা অত্যন্ত জরুরি।"
        ]
      },
      {
        title: "Brain Teaser Strategies",
        content: "অনেক লজিক পাজল কিছু সিস্টেমেটিক নিয়মে সমাধান করা যায়: উত্তর থেকে পেছনের দিকে ভাবা (work backwards), যা পরিবর্তন হয় না তা শনাক্ত করা (invariants), pigeonhole principle ব্যবহার করা (n বাক্সে n+1 জিনিস রাখলে অন্তত একটি বাক্সে ≥ ২ জিনিস থাকবে), কিংবা প্রবলেমটিকে ছোট আকারে নামিয়ে আনা।",
        tips: [
          "'2 egg problem' সীমাবদ্ধতার মাঝে binary search শেখায় — worst-case ড্রপ মিনিমাইজ করুন।",
          "'Find the heavy ball' পাজলের জন্য information theory দিয়ে চিন্তা করুন — প্রতি পাল্লা পরিমাপ ~1.58 bits তথ্য দেয়।",
          "ঘড়ি ও ক্যালেন্ডার সংক্রান্ত সমস্যার জন্য Modular arithmetic ব্যবহার করুন।"
        ]
      }
    ],
    quiz: [
      {
        question: "Trial division পদ্ধতিতে কোনো সংখ্যা n মৌলিক কিনা তা চেক করার time complexity কত?",
        options: ["O(n)", "O(n²)", "O(√n)", "O(log n)"],
        correct: 2,
        explanation: "n-এর যদি √n-এর চেয়ে বড় কোনো উৎপাদক থাকে, তবে তার সাথে সংশ্লিষ্ট অপর উৎপাদকটি অবশ্যই √n-এর চেয়ে ছোট হবে। তাই কেবল √n পর্যন্ত চেক করাই যথেষ্ট।"
      },
      {
        question: "৫টি জিনিস থেকে ৩টি বেছে নেওয়ার উপায় কয়টি (combinations)?",
        options: ["60", "10", "15", "20"],
        correct: 1,
        explanation: "C(5,3) = 5! / (3! × 2!) = 120 / (6 × 2) = 10।"
      },
      {
        question: "Euclidean algorithm অনুযায়ী gcd(48, 18)-এর মান কত?",
        options: ["2", "6", "3", "12"],
        correct: 1,
        explanation: "gcd(48, 18) → gcd(18, 48%18) = gcd(18, 12) → gcd(12, 6) → gcd(6, 0) = 6।"
      },
      {
        question: "একটি নিরপেক্ষ মুদ্রা ৩ বার টস করলে কমপক্ষে একটি Head পাওয়ার সম্ভাবনা কত?",
        options: ["7/8", "3/8", "1/2", "1/8"],
        correct: 0,
        explanation: "P(কমপক্ষে একটি Head) = 1 - P(একটিও Head না) = 1 - (1/2)³ = 1 - 1/8 = 7/8।"
      },
      {
        question: "Pigeonhole principle অনুযায়ী n সংখ্যক পাত্রে n+1 সংখ্যক বস্তু রাখলে:",
        options: [
          "সবগুলো পাত্র পূর্ণ হবে",
          "কমপক্ষে একটি পাত্রে ≥ ২ টি বস্তু থাকবে",
          "ঠিক একটি পাত্র খালি থাকবে",
          "বস্তুগুলো সমানভাবে বিন্যস্ত হবে"
        ],
        correct: 1,
        explanation: "পাত্রের সংখ্যার চেয়ে বস্তুর সংখ্যা বেশি হলে কমপক্ষে একটি পাত্রে একাধিক বস্তু থাকতেই হবে। কম্বিনেটরিক্স ও কম্পিউটার সায়েন্সে এটি খুবই প্রভাবশালী একটি নিয়ম।"
      }
    ]
  },

  // ─── Chapter 7: Object-Oriented Design ────────────────────────
  {
    id: 7,
    title: "Object-Oriented Design",
    icon: "🏗️",
    description: "Design patterns, SOLID principles, এবং OOP ইন্টারভিউয়ের জন্য system modeling।",
    concepts: [
      {
        title: "Core OOP Principles",
        content: "চারটি মূল স্তম্ভ: Encapsulation (মেথডের আড়ালে অভ্যন্তরীণ স্টেট লুকিয়ে রাখা), Abstraction (প্রয়োজনীয় ইন্টারফেস উন্মুক্ত করা), Inheritance (প্যারেন্ট ক্লাস থেকে কোড পুনর্ব্যবহার), এবং Polymorphism (একই ইন্টারফেসের ভিন্ন ভিন্ন বাস্তবায়ন)। Encapsulation বজায় রাখতে access modifiers ব্যবহার করুন।",
        tips: [
          "Inheritance-এর চেয়ে Composition-কে প্রাধান্য দিন — এটি বেশি ফ্লেক্সিবল এবং tight coupling এড়ায়।",
          "Implementation-এর বদলে Interface লক্ষ্য করে কোড লিখুন।",
          "Inheritance নাকি Composition বেছে নেবেন তা ঠিক করতে 'is-a' বনাম 'has-a' রুল অনুসরণ করুন।"
        ]
      },
      {
        title: "SOLID Principles",
        content: "S — Single Responsibility: একটি ক্লাসের পরিবর্তনের কেবল একটিই কারণ থাকবে। O — Open/Closed: এক্সটেনশনের জন্য উন্মুক্ত, কিন্তু মডিফিকেশনের জন্য বন্ধ। L — Liskov Substitution: প্যারেন্ট ক্লাসের জায়গায় সাবটাইপ নির্বিঘ্নে ব্যবহারযোগ্য হতে হবে। I — Interface Segregation: বড় ইন্টারফেসের চেয়ে ছোট ছোট একাধিক ইন্টারফেস শ্রেয়। D — Dependency Inversion: কংক্রিট ক্লাসের ওপর নয়, abstraction-এর ওপর নির্ভর করুন।",
        tips: [
          "Single Responsibility লঙ্ঘিত হলে সচরাচর অতিরিক্ত মেথডযুক্ত 'God classes' তৈরি হয়।",
          "Polymorphism এবং strategy pattern-এর মাধ্যমে Open/Closed নীতি অর্জন করা যায়।",
          "Dependency Inversion নীতি dependency injection-এর সাহায্যে সহজে ইউনিট টেস্ট করার সুযোগ তৈরি করে।"
        ]
      },
      {
        title: "Common Design Patterns",
        content: "Singleton: গ্লোবালি মাত্র একটি instance নিশ্চিত করে। Factory: নির্দিষ্ট ক্লাস উল্লেখ না করে অবজেক্ট তৈরি করে। Observer: ইভেন্ট-চালিত publish/subscribe মডেল। Strategy: অদলবদলযোগ্য অ্যালগরিদমগুলোকে encapsulate করে। Decorator: ক্লাসে হাত না দিয়ে অবজেক্টে ডাইনামিকভাবে নতুন আচরণ যোগ করে।",
        tips: [
          "ইন্টারভিউতে বহুল প্রচলিত ডিজাইন: parking lot, deck of cards, chat server, অথবা file system।",
          "প্রথমে requirements পরিষ্কার করুন, তারপর মূল অবজেক্ট ও তাদের সম্পর্ক চিহ্নিত করুন।",
          "কোড লেখার আগে class diagram আঁকুন — এতে ইন্টারভিউয়ার আপনার চিন্তার ধারা স্পষ্ট বুঝতে পারবেন।"
        ]
      }
    ],
    quiz: [
      {
        question: "কোন OOP নীতি অভ্যন্তরীণ স্টেট লুকিয়ে রেখে মেথডের মাধ্যমে ইন্টারঅ্যাকশন বাধ্যতামূলক করে?",
        options: ["Polymorphism", "Encapsulation", "Inheritance", "Abstraction"],
        correct: 1,
        explanation: "Encapsulation ডেটা এবং তার ওপর কাজ করা মেথডগুলোকে একত্রিত করে এবং সরাসরি ইন্টারনাল স্টেটে অ্যাক্সেস সীমাবদ্ধ করে নিয়ন্ত্রিত ব্যবহারের নিশ্চয়তা দেয়।"
      },
      {
        question: "SOLID নীতিমালায় 'S'-এর পূর্ণরূপ কী?",
        options: [
          "Scalability Principle",
          "Single Responsibility Principle",
          "Substitution Principle",
          "Separation of Concerns"
        ],
        correct: 1,
        explanation: "Single Responsibility Principle: একটি ক্লাসের পরিবর্তনের একটি এবং কেবল একটি কারণ থাকা উচিত।"
      },
      {
        question: "কোন design pattern একটি ক্লাসের কেবল একটি instance থাকা নিশ্চিত করে?",
        options: ["Factory", "Observer", "Singleton", "Strategy"],
        correct: 2,
        explanation: "Singleton প্যাটার্ন সাধারণত private constructor এবং static getInstance() মেথড ব্যবহারের মাধ্যমে ক্লাসের অবজেক্ট তৈরিকে মাত্র একটিতেই সীমাবদ্ধ রাখে।"
      },
      {
        question: "'Favor composition over inheritance' বাক্যটির অর্থ কী?",
        options: [
          "কখনোই inheritance ব্যবহার করবেন না",
          "গভীর ক্লাস হায়ারার্কি না বানিয়ে অবজেক্ট যুক্ত করে জটিল আচরণ তৈরি করুন",
          "সবসময় abstract class ব্যবহার করুন",
          "Interface পুরোপুরি বর্জন করুন"
        ],
        correct: 1,
        explanation: "Composition বিভিন্ন অবজেক্ট একত্রিত করে ফ্লেক্সিবল ডিজাইন তৈরি করে, যা জটিল ও ভঙ্গুর ক্লাস হায়ারার্কির ঝামেলা এড়াতে সাহায্য করে।"
      },
      {
        question: "Observer pattern-এ subject-এর স্টেট পরিবর্তিত হলে কী ঘটে?",
        options: [
          "Subject নষ্ট হয়ে যায়",
          "রেজিস্টার্ড সকল observer স্বয়ংক্রিয়ভাবে নোটিফিকেশন পায়",
          "Factory একটি নতুন subject তৈরি করে",
          "Singleton রিসেট হয়ে যায়"
        ],
        correct: 1,
        explanation: "Observer pattern এক-থেকে-বহু (one-to-many) ডিপেন্ডেন্সি তৈরি করে। Subject-এর স্টেট বদলালে এটি তার সব রেজিস্টার্ড observer-কে জানিয়ে দেয় যাতে তারা আপডেট হতে পারে।"
      }
    ]
  },

  // ─── Chapter 8: Recursion & Dynamic Programming ───────────────
  {
    id: 8,
    title: "Recursion & Dynamic Programming",
    icon: "🔄",
    description: "Base cases, memoization, tabulation, এবং প্রবলেমকে সাব-প্রবলেমে ভেঙে ফেলার কৌশল।",
    concepts: [
      {
        title: "Recursion Fundamentals",
        content: "প্রতিটি recursive সমাধানে দুটি অংশ থাকা আবশ্যক: একটি base case (কখন থামতে হবে) এবং একটি recursive case (কীভাবে সমস্যাকে ছোট করতে হবে)। ফাংশন কলের স্টেট call stack-এ জমা থাকে। খুব গভীরে recursion চললে stack overflow হতে পারে — এমন ক্ষেত্রে iteration-এ কনভার্ট করা বা tail recursion ব্যবহার করার কথা ভাবুন।",
        tips: [
          "Recursive ফাংশন লেখার সময় শুরুতেই সবার আগে base case ডিফাইন করুন।",
          "Recursion-এর ওপর ভরসা রাখুন: ধরে নিন ছোট ইনপুটের জন্য recursive কল সঠিক উত্তরই ফেরত দেবে।",
          "টাইম কমপ্লেক্সিটি বুঝতে এবং overlapping subproblems চিহ্নিত করতে recursion tree আঁকুন।"
        ]
      },
      {
        title: "Memoization (Top-Down DP)",
        content: "Memoization ব্যয়বহুল ফাংশন কলের ফলাফল cache করে রাখে। একই ইনপুট আবার আসলে পুনরায় হিসাব না করে ক্যাশ থেকে ফলাফল ফিরিয়ে দেয়। অপ্রয়োজনীয় পুনরাবৃত্তি দূর করে এটি সূচকীয় (exponential) সময়ের রিকার্সিভ সমাধানকে বহুপদী (polynomial) সময়ে রূপান্তর করে।",
        tips: [
          "Memoization ছাড়া Fibonacci: O(2ⁿ)। Memoization সহ: O(n)।",
          "হিসাবকৃত ফলাফল সংরক্ষণ করতে hash map বা array ব্যবহার করুন।",
          "Recursive কোডের সাথে Memoization দারুণ মানিয়ে যায় — ফাংশনের শুরুতে শুধু একটি cache চেক যোগ করলেই হয়।"
        ]
      },
      {
        title: "Tabulation (Bottom-Up DP)",
        content: "সবচেয়ে ছোট সাব-প্রবলেম থেকে শুরু করে ধারাবাহিকভাবে সমাধানের টেবিল তৈরি করা হয়। সাধারণত একটি array তৈরি করে dp[i]-তে i-তম সাব-প্রবলেমের ফলাফল জমা রাখা হয়। এটি রিকার্শনের অতিরিক্ত ওভারহেড কমায় এবং মেমোরির দিক থেকেও সাশ্রয়ী।",
        tips: [
          "ক্লাসিক DP প্রবলেম: Fibonacci, coin change, longest common subsequence, knapsack, edit distance।",
          "আগে recurrence relation চিহ্নিত করুন, তারপর ঠিক করুন top-down করবেন নাকি bottom-up।",
          "Space optimization: dp[i] যদি কেবল dp[i-1] (এবং হয়তো dp[i-2])-এর ওপর নির্ভর করে, তবে পুরো array না রেখে O(1) স্পেসেই কাজ সারা যায়।"
        ]
      },
      {
        title: "Recognizing DP Problems",
        content: "দুটি প্রধান বৈশিষ্ট্য থাকলে কোনো সমস্যায় DP প্রয়োগ করা যায়: (১) Optimal substructure — মূল সমস্যার সর্বোত্তম সমাধান সাব-প্রবলেমের সর্বোত্তম সমাধান দিয়ে গঠিত, এবং (২) Overlapping subproblems — একই সাব-প্রবলেম বারবার হিসাব করতে হয়। শুধু (১) থাকলে greedy বা divide-and-conquer চেষ্টা করুন।",
        tips: [
          "মূল সংকেত: 'minimum cost', 'maximum profit', 'number of ways', 'is it possible'।",
          "State স্পষ্টভাবে সংজ্ঞায়িত করুন: কোন কোন ভ্যারিয়েবল একটি সাব-প্রবলেমকে অনন্যভাবে প্রকাশ করে?",
          "Transition সংজ্ঞায়িত করুন: একটি সাব-প্রবলেমের উত্তর ছোট সাব-প্রবলেমগুলোর সাথে কীভাবে সম্পর্কিত?"
        ]
      }
    ],
    quiz: [
      {
        question: "প্রতিটি recursive ফাংশনের অপরিহার্য দুটি উপাদান কী কী?",
        options: [
          "Loop এবং counter",
          "Base case এবং recursive case",
          "Stack এবং queue",
          "Input এবং output"
        ],
        correct: 1,
        explanation: "Base case ঠিক করে কখন রিকার্শন থামবে; আর recursive case সমস্যাটিকে ছোট করে base case-এর দিকে এগিয়ে নিয়ে যায়।"
      },
      {
        question: "সাধারণ naive recursive Fibonacci-র time complexity কত?",
        options: ["O(n)", "O(n²)", "O(2ⁿ)", "O(n log n)"],
        correct: 2,
        explanation: "Memoization ছাড়া প্রতিটি কল দুটি নতুন শাখায় ভাগ হয়, যা একটি বাইনারি ট্রি তৈরি করে। ফলে মোট কলের সংখ্যা দাঁড়ায় প্রায় 2ⁿ।"
      },
      {
        question: "Memoization ব্যবহারের ফলে recursive Fibonacci-র time complexity O(2ⁿ) থেকে কততে নেমে আসে?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correct: 2,
        explanation: "প্রতিটি সাব-প্রবলেম (fib(0) থেকে fib(n)) ঠিক একবারই হিসাব করা হয় এবং ক্যাশে রাখা হয়, ফলে মোট কাজ হয় O(n)।"
      },
      {
        question: "Dynamic programming দিয়ে সমাধান করতে কোনো সমস্যার কোন দুটি বৈশিষ্ট্য থাকা আবশ্যক?",
        options: [
          "Sorted input এবং binary search",
          "Optimal substructure এবং overlapping subproblems",
          "Greedy choice এবং optimal substructure",
          "Divide and conquer এবং merge step"
        ],
        correct: 1,
        explanation: "Optimal substructure নিশ্চিত করে যে ছোট অংশের সেরা সমাধান মিলিয়ে বড় সমস্যার সেরা সমাধান পাওয়া যাবে। Overlapping subproblems বোঝায় একই সাব-প্রবলেম বারবার আসে, যা ক্যাশ করা ফলপ্রসূ করে তোলে।"
      },
      {
        question: "Bottom-up DP কীভাবে top-down memoization থেকে আলাদা?",
        options: [
          "এটি recursion ব্যবহার করে",
          "এটি ছোট সাব-প্রবলেম থেকে শুরু করে ধারাবাহিকভাবে একটি টেবিল পূর্ণ করে",
          "এটি বেশি মেমোরি ব্যবহার করে",
          "এটিতে recurrence relation-এর প্রয়োজন হয় না"
        ],
        correct: 1,
        explanation: "Bottom-up (tabulation) পদ্ধতিতে রিকার্শন এড়িয়ে ক্রমানুসারে ছোট সাব-প্রবলেমগুলো সমাধান করে সরাসরি টেবিলে সংরক্ষণ করা হয়।"
      }
    ]
  },

  // ─── Chapter 9: Sorting & Searching ───────────────────────────
  {
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
  },

  // ─── Chapter 10: System Design & Scalability ──────────────────
  {
    id: 10,
    title: "System Design & Scalability",
    icon: "🌐",
    description: "Distributed systems, caching, databases, এবং মিলিয়ন ইউজারের জন্য সিস্টেম ডিজাইন।",
    concepts: [
      {
        title: "Scalability Fundamentals",
        content: "Vertical scaling (বড় মেশিন ব্যবহার) সহজ কিন্তু সীমাবদ্ধ। Horizontal scaling (বেশি সংখ্যক মেশিন যুক্ত করা) অপেক্ষাকৃত জটিল হলেও কার্যত সীমাহীন। Load balancer বিভিন্ন সার্ভারে রিকোয়েস্ট ভাগ করে দেয়। Stateful সার্ভিসের চেয়ে Stateless সার্ভিস খুব সহজে হরিজন্টালি স্কেল করা যায়।",
        tips: [
          "শুরুতেই রিকোয়ারমেন্টস পরিষ্কার করুন: ইউজার সংখ্যা, ডেটার পরিমাণ, read/write অনুপাত, লেটেন্সি লিমিট।",
          "স্কেল পরিমাপ: ১০ লাখ ইউজার × ১০ রিকোয়েস্ট/দিন = গড়ে প্রায় ১১৫ রিকোয়েস্ট/সেকেন্ড।",
          "Back-of-envelope ক্যালকুলেশন ইন্টারভিউয়ারকে আশ্বস্ত করে — এটি নিয়মিত অনুশীলন করুন।"
        ]
      },
      {
        title: "Caching & CDNs",
        content: "ঘনঘন ব্যবহৃত ডেটা মেমোরিতে (RAM) রেখে ডাটাবেজের ওপর চাপ কমায় Cache। ক্যাশিং স্ট্র্যাটেজি: write-through (ক্যাশ ও ডিবি উভয়ে লেখা), write-back (আগে ক্যাশে লেখা, পরে ব্যাকগ্রাউন্ডে ডিবিতে), cache-aside (অ্যাপ নিজে ক্যাশ রিড/রাইট নিয়ন্ত্রণ করে)। CDN বিশ্বব্যাপী এজ লোকেশনে স্ট্যাটিক কনটেন্ট ক্যাশ করে।",
        tips: [
          "Cache invalidation সবচেয়ে কঠিন সমস্যাগুলোর একটি — সহজ উপায় হিসেবে TTL (time-to-live) ব্যবহার করুন।",
          "Redis এবং Memcached হলো বহুল ব্যবহৃত ইন-মেমোরি ক্যাশ।",
          "ক্যাশ হিট রেট ৯০%-এর বেশি থাকার অর্থ আপনার ক্যাশিং স্ট্র্যাটেজি চমৎকারভাবে কাজ করছে।"
        ]
      },
      {
        title: "Databases & Storage",
        content: "SQL ডাটাবেজ (PostgreSQL, MySQL) ACID ট্রানজ্যাকশন দেয় এবং স্ট্রাকচার্ড রিলেশনাল ডেটার জন্য আদর্শ। NoSQL ডাটাবেজ (MongoDB, Cassandra, DynamoDB) স্কেলাবিলিটি ও ফ্লেক্সিবিলিটির জন্য কনসিস্টেন্সিতে কিছুটা ছাড় দেয়। Sharding একটি shard key-এর ওপর ভিত্তি করে ডেটাকে একাধিক ডাটাবেজে ভাগ করে।",
        tips: [
          "Join, ট্রানজ্যাকশন ও কঠোর ডেটা ইন্টিগ্রিটির জন্য SQL বেছে নিন (যেমন: ফাইন্যান্সিয়াল সিস্টেম)।",
          "অধিক write throughput, ফ্লেক্সিবল স্কিমা ও হরিজন্টাল স্কেলিংয়ের জন্য NoSQL বেছে নিন (যেমন: সোশ্যাল ফিড, লগ)।",
          "ডাটাবেজ ইনডেক্সিং (B-trees) O(n) স্ক্যানকে O(log n) লুকেআপে রূপান্তর করে — ইন্টারভিউতে ইনডেক্স নিয়ে অবশ্যই আলোচনা করুন।"
        ]
      },
      {
        title: "Key System Design Patterns",
        content: "Message queue (Kafka, RabbitMQ) প্রযোজক ও গ্রাহকের সংযোগকে ডিকাপল করে। Microservices মনোলিথ সিস্টেমকে স্বাধীনভাবে ডিপ্লয়যোগ্য সার্ভিসে বিভক্ত করে। API gateway অথেন্টিকেশন, রেট লিমিটিং ও রাউটিং নিয়ন্ত্রণ করে। Consistent hashing নোড যোগ/বাদ পড়ার সময় সর্বনিম্ন ডেটা স্থানান্তরের মাধ্যমে সুষম বণ্টনের নিশ্চয়তা দেয়।",
        tips: [
          "সাধারণ ইন্টারভিউ ডিজাইন: URL shortener, Twitter feed, chat application, web crawler।",
          "একটি সুনির্দিষ্ট কাঠামো বজায় রাখুন: requirements → high-level design → deep dive → bottlenecks।",
          "ট্রেড-অফ নিয়ে কথা বলুন: consistency বনাম availability (CAP theorem), latency বনাম throughput।"
        ]
      }
    ],
    quiz: [
      {
        question: "Vertical এবং Horizontal scaling-এর মধ্যে মূল পার্থক্য কী?",
        options: [
          "Vertical বেশি মেশিন যুক্ত করে; horizontal একটি মেশিনের ক্ষমতা বাড়ায়",
          "Vertical একটি মেশিনের ক্ষমতা বাড়ায়; horizontal বেশি মেশিন যুক্ত করে",
          "উভয়ই মূলত একই বিষয়",
          "Vertical কেবল ডাটাবেজের জন্য; horizontal কেবল অ্যাপ্লিকেশনের জন্য"
        ],
        correct: 1,
        explanation: "Vertical scaling (scale up) হলো একটি একক সার্ভারের CPU/RAM বৃদ্ধি করা। Horizontal scaling (scale out) হলো চাপ সামলাতে নেটওয়ার্কে আরও নতুন সার্ভার যুক্ত করা।"
      },
      {
        question: "Cache invalidation বলতে কী বোঝায়?",
        options: [
          "ক্যাশে নতুন ডেটা যুক্ত করা",
          "ক্যাশ থেকে পুরনো বা অপ্রাসঙ্গিক ডেটা মুছে ফেলা বা আপডেট করা",
          "ক্যাশের ডেটা এনক্রিপ্ট করা",
          "ক্যাশের এন্ট্রি সংকুচিত করা"
        ],
        correct: 1,
        explanation: "Cache invalidation নিশ্চিত করে যাতে ব্যবহারকারী সেকেলে বা ভুল ডেটা না পায়। কম্পিউটার সায়েন্সের অন্যতম জটিল সমস্যাগুলোর একটি হিসেবে এটিকে বিবেচনা করা হয়।"
      },
      {
        question: "SQL-এর চেয়ে NoSQL ডাটাবেজ কোন ক্ষেত্রে বেশি উপযোগী?",
        options: [
          "যখন কঠোর ACID ট্রানজ্যাকশন অপরিহার্য",
          "যখন জটিল join অপারেশন দরকার হয়",
          "যখন উচ্চ write throughput এবং horizontal scalability প্রয়োজন",
          "যখন ডেটার নির্ভরযোগ্যতা ও অখণ্ডতা সর্বোচ্চ অগ্রাধিকার"
        ],
        correct: 2,
        explanation: "NoSQL ডাটাবেজ উচ্চ write throughput, পরিবর্তনশীল স্কিমা এবং সহজে অনুভূমিকভাবে স্কেল করার জন্য দুর্দান্ত। তবে SQL-এর মতো কঠোর consistency ও জটিল join এতে পাওয়া যায় না।"
      },
      {
        question: "Load balancer-এর প্রধান কাজ কী?",
        options: [
          "মেমোরিতে ডেটা সাময়িকভাবে ধরে রাখা",
          "আগত নেটওয়ার্ক ট্র্যাফিক একাধিক সার্ভারের মধ্যে সুষমভাবে বণ্টন করা",
          "নেটওয়ার্ক ট্র্যাফিক কম্প্রেস করা",
          "ট্রান্সমিশনে থাকা ডেটা এনক্রিপ্ট করা"
        ],
        correct: 1,
        explanation: "একটি Load balancer আগত রিকোয়েস্টগুলো একাধিক সার্ভারে ভাগ করে দেয় যাতে কোনো একটি সার্ভার অতিরিক্ত চাপে ক্র্যাশ না করে, যা সিস্টেমের পারফরম্যান্স ও স্থায়িত্ব বাড়ায়।"
      },
      {
        question: "CAP উপপাদ্য অনুযায়ী একটি ডিস্ট্রিবিউটেড সিস্টেম Consistency, Availability, এবং Partition tolerance-এর মধ্যে সর্বোচ্চ কয়টি নিশ্চয়তা দিতে পারে?",
        options: ["১টি", "২টি", "৩টি", "এটি ডাটাবেজের ধরনের ওপর নির্ভর করে"],
        correct: 1,
        explanation: "CAP theorem প্রমাণ করে যে নেটওয়ার্ক পার্টেশনের উপস্থিতিতে একটি সিস্টেমকে Consistency (সবাই একই ডেটা দেখবে) অথবা Availability (সব রিকোয়েস্টের উত্তর পাওয়া যাবে)-এর মধ্যে যেকোনো একটি বেছে নিতে হয়। ফলে ৩টির মধ্যে সর্বোচ্চ ২টি অর্জন করা সম্ভব।"
      }
    ]
  }
];

// ── Learning Tracks Definition ──────────────────────────────────────
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
    chapters: [6, 8, 10]
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
    chapters: [7, 9]
  }
];

// ── Milestone Badges Definition ─────────────────────────────────────
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
    check: (p) => [6, 8, 10].every((id) => p.chapters?.[id]?.quizCompleted)
  },
  {
    id: "track_4",
    title: "সিস্টেম আর্কিটেক্ট",
    icon: "🏛️",
    description: "System Architecture & OOP আয়ত্ত করুন (Track 4)",
    check: (p) => [7, 9].every((id) => p.chapters?.[id]?.quizCompleted)
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
