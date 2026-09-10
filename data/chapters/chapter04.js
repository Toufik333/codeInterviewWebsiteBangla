/**
 * Chapter 04: Trees & Graphs
 */

const chapter04 = {
  id: 4,
  title: "Trees & Graphs",
  icon: "🌲",
  description: "DFS/BFS ট্রাভার্সাল, BST বৈশিষ্ট্য, Trie, এবং টপোলজিক্যাল সর্ট আয়ত্ত করুন।",
  concepts: [
    {
      title: "Binary Trees",
      content: "প্রতিটি নোডে সর্বোচ্চ ২টি চিলড্রেন থাকে। ট্রাভার্সাল প্রকারভেদ: In-order (Left, Root, Right — BST-তে sorted আউটপুট দেয়), Pre-order (Root, Left, Right — ট্রি কপি বা সিরিয়ালাইজ করতে উপযোগী), এবং Post-order (Left, Right, Root — নোড ডিলিট বা বটম-আপ হিসাবে উপযোগী)। Level-order (BFS) কিউ ব্যবহার করে লেভেল অনুযায়ী ভিজিট করে।",
      bigO: { inOrder: "O(n)", preOrder: "O(n)", postOrder: "O(n)", levelOrder: "O(n)" },
      tips: [
        "ট্রি সংক্রান্ত ৮০% প্রবলেম রিকার্শন বা DFS দিয়ে সহজে সমাধান করা যায়।",
        "Base case সবসময় নিশ্চিত করুন: `if (!node) return;`",
        "Stack overflow এড়াতে অতি গভীর ট্রি-র ক্ষেত্রে iterative মেথডের কথা বিবেচনা করুন।"
      ]
    },
    {
      title: "Binary Search Trees (BST)",
      content: "BST-এর শর্ত: বাম সাবট্রির সব মান নোডের চেয়ে ছোট (<), এবং ডান সাবট্রির সব মান বড় (>)। ব্যালেন্সড হলে search, insert, এবং delete O(log n) সময় নেয়। আনব্যালেন্সড (যেমন ক্রমান্বয়ে ইনসার্ট করা) হলে তা মূলত linked list-এ পরিণত হয় এবং O(n) সময় নেয়।",
      bigO: { searchAvg: "O(log n)", insertAvg: "O(log n)", deleteAvg: "O(log n)", worstCase: "O(n)" },
      tips: [
        "BST ভ্যালিডেট করতে `left.val < node.val` চেক করা যথেষ্ট নয় — পুরো সাবট্রির মিনিমাম এবং ম্যাক্সিমাম রেঞ্জ `[min, max]` পাস করতে হয়।",
        "In-order ট্রাভার্সাল চালালে BST সবসময় স্ট্রিক্টলি সাজানো (sorted) উপাদান দেয়।"
      ]
    },
    {
      title: "Heaps & Tries",
      content: "Min/Max-Heap হলো complete binary tree যেখানে রুট সবসময় সর্বনিম্ন বা সর্বোচ্চ মান রাখে। O(1) peek এবং O(log n) insert/extractMin পাওয়া যায়। Trie (Prefix Tree) স্ট্রিং ও শব্দ অনুসন্ধানের জন্য অত্যন্ত দক্ষ — যেকোনো শব্দ খুঁজতে শব্দের দৈর্ঘ্য O(L) সময় লাগে।",
      bigO: { heapPeek: "O(1)", heapInsert: "O(log n)", heapExtract: "O(log n)", trieSearch: "O(L)" },
      tips: [
        "K-th largest বা Top-K প্রবলেমের জন্য সাইজ K-এর Min-Heap ব্যবহার করুন।",
        "অটোকমপ্লিট এবং ডিকশনারি সার্চের জন্য Trie সেরা পছন্দ।"
      ]
    },
    {
      title: "Graph Traversals & Algorithms",
      content: "গ্রাফ উপস্থাপনের জন্য Adjacency List সবচেয়ে মেমোরি-দক্ষ। BFS (Queue দিয়ে) ক্ষুদ্রতম পথ (shortest path unweighted) খুঁজে দেয়। DFS (Stack/Recursion দিয়ে) সাইকেল সনাক্তকরণ ও পাথ ট্র্যাকিংয়ে উপযোগী। সাইকেল এড়াতে `visited` সেট ব্যবহার অপরিহার্য।",
      bigO: { bfs: "O(V + E)", dfs: "O(V + E)", dijkstra: "O((V + E) log V)" },
      tips: [
        "Unweighted গ্রাফে শর্টেস্ট পাথের জন্য সবসময় BFS ব্যবহার করুন।",
        "টাস্ক শিডিউলিং বা ডিপেন্ডেন্সি সমাধানের জন্য Directed Acyclic Graph (DAG)-এ Topological Sort ব্যবহার করুন।"
      ]
    }
  ],
  problems: [
    {
      id: "4.2",
      title: "Minimal Tree",
      banglaTitle: "ন্যূনতম উচ্চতার বাইনারি সার্চ ট্রি",
      difficulty: "Easy",
      description: "একটি সাজানো (sorted) ও অনন্য (unique) উপাদানবিশিষ্ট array দেওয়া থাকলে, সর্বনিম্ন উচ্চতাসম্পন্ন একটি Binary Search Tree (BST) তৈরি করুন।",
      examples: [
        { input: "[1, 2, 3, 4, 5, 6, 7]", output: "Root: 4, Left: [2, 1, 3], Right: [6, 5, 7]", explanation: "অ্যারের মাঝের উপাদানটিকে রুট ধরে ব্যালেন্সড ট্রি তৈরি করা হয়েছে।" }
      ],
      constraints: ["উপাদানগুলো ক্রমবর্ধমান ক্রমে সাজানো"],
      hints: [
        "💡 Hint 1: সর্বনিম্ন উচ্চতা পেতে হলে রুটের দুই পাশের নোড সংখ্যা যথাসম্ভব সমান হতে হবে।",
        "💡 Hint 2: অ্যারের ঠিক মাঝের (middle) উপাদানটি রুট হওয়া উচিত। বাকি বাম অংশ বাম সাবট্রি এবং ডান অংশ ডান সাবট্রি তৈরি করবে।"
      ],
      approach: "Divide-and-Conquer রিকার্শন ব্যবহার করুন। প্রতি ধাপে সাব-অ্যারের মিডল এলিমেন্টকে নোড হিসেবে তৈরি করুন, বাম সাব-অ্যারে দিয়ে বাম চাইল্ড এবং ডান সাব-অ্যারে দিয়ে ডান চাইল্ড রিকার্সিভলি যুক্ত করুন।",
      solutions: [
        {
          language: "javascript",
          code: `function sortedArrayToBST(nums) {
  function buildTree(start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const node = { val: nums[mid], left: null, right: null };
    node.left = buildTree(start, mid - 1);
    node.right = buildTree(mid + 1, end);
    return node;
  }
  return buildTree(0, nums.length - 1);
}`,
          explanation: "প্রতিটি উপাদান একবার ভিজিট করায় O(n) সময়ে নিখুঁত ব্যালেন্সড ট্রি পাওয়া যায়।"
        }
      ],
      complexity: { time: "O(n)", space: "O(log n) call stack" }
    },
    {
      id: "4.5",
      title: "Validate BST",
      banglaTitle: "বাইনারি সার্চ ট্রি বৈধতা যাচাই",
      difficulty: "Medium",
      description: "একটি বাইনারি ট্রি বৈধ Binary Search Tree (BST) কিনা তা যাচাই করার কোড লিখুন।",
      examples: [
        { input: "Root 2, Left 1, Right 3", output: "true", explanation: "1 < 2 < 3 শর্ত পূরণ হয়েছে।" },
        { input: "Root 5, Left 1, Right 4 (Left of 4 is 3)", output: "false", explanation: "ডান সাবট্রির উপাদান রুট ৫-এর চেয়ে ছোট হতে পারে না।" }
      ],
      constraints: ["বাম সাবট্রির সব নোড < current, ডান সাবট্রির সব নোড > current"],
      hints: [
        "💡 Hint 1: শুধুমাত্র `node.left.val < node.val` চেক করলে ভুল হবে, কারণ কোনো নোডের ডানদিকের গভীরের উপাদানও রুট থেকে বড় হতে হবে।",
        "💡 Hint 2: রিকার্শনের সময় প্রতিটি নোডের জন্য গ্রহণযোগ্য সীমার `[min, max]` রেঞ্জ পাস করুন।"
      ],
      approach: "প্রতিটি নোডের জন্য একটি অনুমোদিত রেঞ্জ `(min, max)` মেনে চলতে হবে। রুটের জন্য রেঞ্জ `(-Infinity, +Infinity)`। বামে গেলে নতুন রেঞ্জ হবে `(min, node.val)` এবং ডানে গেলে `(node.val, max)`। কোনো নোড সীমার বাইরে গেলে সাথে সাথে false রিটার্ন করুন।",
      solutions: [
        {
          language: "javascript",
          code: `function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;

  return (
    isValidBST(root.left, min, root.val) &&
    isValidBST(root.right, root.val, max)
  );
}`,
          explanation: "প্রতি নোডে রেঞ্জ চেক করে O(n) সময়ে সঠিক BST যাচাই।"
        }
      ],
      complexity: { time: "O(n)", space: "O(h) যেখানে h হলো ট্রির উচ্চতা" }
    }
  ],
  quiz: [
    {
      question: "BST-তে কোন ট্রাভার্সাল উপাদানগুলোকে ক্রমানুসারে (sorted order) প্রিন্ট করে?",
      options: ["Pre-order", "In-order", "Post-order", "Level-order"],
      correct: 1,
      explanation: "In-order traversal বাম সাবট্রি -> বর্তমান নোড -> ডান সাবট্রি ক্রমে যায়, যা BST-র সংজ্ঞানুযায়ী সাজানো মান প্রদর্শন করে।"
    },
    {
      question: "Unweighted গ্রাফে দুটি নোডের মধ্যে সবচেয়ে কম দূরত্বের পথ (shortest path) খুঁজতে কোন অ্যালগরিদম আদর্শ?",
      options: ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Binary Search", "Quicksort"],
      correct: 1,
      explanation: "BFS স্তর অনুযায়ী (level by level) চারদিকে বিস্তার লাভ করে, ফলে লক্ষ্য নোডটি পৌঁছানোর প্রথম পথটিই নিশ্চিতভাবে সর্বনিম্ন দূরত্বের হয়।"
    },
    {
      question: "Trie ডেটা স্ট্রাকচারে L দৈর্ঘ্যের একটি শব্দ খুঁজতে সময় কত লাগে?",
      options: ["O(n)", "O(log n)", "O(L)", "O(L²)"],
      correct: 2,
      explanation: "Trie-তে প্রতি ক্যারেক্টারের জন্য ঠিক একটি নোড ট্রাভার্স করতে হয়, তাই মোট সময় শব্দের দৈর্ঘ্য L-এর সমানুপাতিক O(L)।"
    },
    {
      question: "সম্পূর্ণ ভারসাম্যহীন (degenerate) BST-তে কোনো উপাদান খোঁজার worst-case time complexity কত?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correct: 2,
      explanation: "উপাদানগুলো ক্রমান্বয়ে যুক্ত হলে ট্রি সোজা লাইনের মতো (Linked List) হয়ে যায়, ফলে worst-case time O(n)-এ নেমে যায়।"
    },
    {
      question: "নির্ভরশীলতা বা ডিপেন্ডেন্সি (যেমন টাস্ক শিডিউলিং) সমাধানের জন্য নিচের কোনটি ব্যবহৃত হয়?",
      options: ["Dijkstra's Algorithm", "Topological Sort (on DAG)", "Floyd-Warshall", "Prim's Algorithm"],
      correct: 1,
      explanation: "Topological sort একটি ডিরেক্টেড অ্যাসাইক্লিক গ্রাফের শীর্ষবিন্দুগুলোকে এমনভাবে সাজায় যাতে প্রতিটি ডিপেন্ডেন্সি পূর্বেই সম্পন্ন হয়।"
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = chapter04;
}
