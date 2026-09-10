/**
 * Chapter 03: Stacks & Queues
 */

const chapter03 = {
  id: 3,
  title: "Stacks & Queues",
  icon: "📚",
  description: "LIFO এবং FIFO প্যাটার্ন, monotonic stack, এবং bounded buffer ডিজাইন শিখুন।",
  concepts: [
    {
      title: "Stack (LIFO)",
      content: "Stack হলো Last-In, First-Out ডেটা স্ট্রাকচার। Push, pop, এবং peek অপারেশন O(1) সময় নেয়। এটি সচরাচর recursion tracking (call stack), undo/redo হিস্টোরি, syntax parsing (যেমন বন্ধনী মেলানো), এবং monotonic stack প্যাটার্নে ব্যবহৃত হয়।",
      bigO: { push: "O(1)", pop: "O(1)", peek: "O(1)", search: "O(n)" },
      tips: [
        "Empty stack-এ pop বা peek করার আগে সবসময় `.isEmpty()` চেক করুন যাতে underflow না হয়।",
        "Next greater element বা histogram এরিয়ার প্রবলেমে Monotonic Stack ব্যবহার করুন।",
        "Array বা linked list উভয় দিয়েই stack বাস্তবায়ন করা যায়।"
      ]
    },
    {
      title: "Queue (FIFO)",
      content: "Queue হলো First-In, First-Out ডেটা স্ট্রাকচার। Enqueue শেষে এবং dequeue শুরু থেকে করা হয় — দুটিই O(1)। এটি BFS ট্রাভার্সাল, প্রিন্টার স্পুলার, এবং asynchronous টাস্ক প্রসেসিংয়ে ব্যবহৃত হয়। Circular array দিয়ে মেমোরি রিইউজ করা যায়।",
      bigO: { enqueue: "O(1)", dequeue: "O(1)", peek: "O(1)", search: "O(n)" },
      tips: [
        "JavaScript-এ `array.shift()` ব্যবহার করবেন না কারণ এতে O(n) শিফটিং হয়; এর বদলে Linked List বা circular pointer ব্যবহার করুন।",
        "দুপাশ থেকেই insert/delete করতে Deque (Double-ended queue) ব্যবহার করুন।",
        "Priority Queue মূলত Heap দিয়ে বাস্তবায়িত হয়, যেখানে সবচেয়ে গুরুত্বপূর্ণ উপাদানটি O(log n)-এ বের করা যায়।"
      ]
    },
    {
      title: "Classic Problems",
      content: "দুটি stack দিয়ে একটি queue তৈরি করার ক্লাসিক প্যাটার্ন হলো: একটি stack ইনপুটের জন্য এবং অন্যটি আউটপুটের জন্য রাখা। Valid parentheses প্রবলেমে ওপেনিং বন্ধনী পুশ এবং ক্লোজিং বন্ধনীতে পপ করে যাচাই করা হয়।",
      tips: [
        "Queue via Stacks: output stack ফাঁকা হলে কেবল তখনই input stack থেকে সব উপাদান pop করে push করুন — এতে amortized O(1) বজায় থাকে।",
        "Min Stack: প্রতিটি এলিমেন্টের সাথে সেই সময়ের মিনিমাম ভ্যালু ট্র্যাকিংয়ের মাধ্যমে O(1)-এ min() পাওয়া যায়।"
      ]
    }
  ],
  problems: [
    {
      id: "3.2",
      title: "Stack Min",
      banglaTitle: "মিনিমাম এলিমেন্টযুক্ত স্ট্যাক",
      difficulty: "Medium",
      description: "একটি Stack ডিজাইন করুন যা push এবং pop ছাড়াও min মেথড সমর্থন করবে এবং তিনটি অপারেশনই O(1) সময়ে সম্পন্ন হবে।",
      examples: [
        { input: "push(5), push(6), push(3), push(7), min()", output: "3", explanation: "বর্তমানে স্ট্যাকের সর্বনিম্ন মান হলো ৩।" }
      ],
      constraints: ["সব অপারেশন O(1) সময়ে হতে হবে"],
      hints: [
        "💡 Hint 1: প্রতিটি নোডের সাথে সেই মুহূর্তে স্ট্যাকের সর্বনিম্ন মান কত ছিল তা কি রেকর্ড রাখা সম্ভব?",
        "💡 Hint 2: একটি সহায়ক (auxiliary) minStack ব্যবহার করুন যা কেবল নতুন কোনো ক্ষুদ্রতম মান আসার সময় আপডেট হবে।"
      ],
      approach: "মূল স্ট্যাকের পাশাপাশি একটি `minStack` রাখুন। যখনই কোনো সংখ্যা পুশ করা হবে যা বর্তমান মিনিমামের চেয়ে সমান বা ছোট, সেটিকে `minStack`-এ পুশ করুন। পপ করার সময় যদি মূল স্ট্যাকের মান `minStack`-এর শীর্ষের সমান হয়, তবে `minStack`- থেকেও পপ করুন।",
      solutions: [
        {
          language: "javascript",
          code: `class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);
    if (this.minStack.length === 0 || val <= this.getMin()) {
      this.minStack.push(val);
    }
  }

  pop() {
    const val = this.stack.pop();
    if (val === this.getMin()) {
      this.minStack.pop();
    }
    return val;
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}`,
          explanation: "দুটি স্ট্যাক সমন্বয়ে প্রতিটি অপারেশনের জন্য O(1) টাইম কমপ্লেক্সিটি নিশ্চিত করা হয়েছে।"
        }
      ],
      complexity: { time: "O(1) push, pop, min", space: "O(n)" }
    },
    {
      id: "3.4",
      title: "Queue via Stacks",
      banglaTitle: "দুটি স্ট্যাক দিয়ে কিউ তৈরি",
      difficulty: "Medium",
      description: "দুটি stack ব্যবহার করে একটি `MyQueue` ক্লাস বাস্তবায়ন করুন যাতে FIFO আচরণ বজায় থাকে।",
      examples: [
        { input: "enqueue(1), enqueue(2), dequeue()", output: "1", explanation: "প্রথমে ১ ঢুকেছিল, তাই প্রথমে ১ বের হবে।" }
      ],
      constraints: ["শুধুমাত্র স্ট্যান্ডার্ড স্ট্যাক অপারেশন (push, pop, peek, size) ব্যবহার করা যাবে"],
      hints: [
        "💡 Hint 1: একটি স্ট্যাক নতুন উপাদানগুলো নেওয়ার জন্য এবং অপরটি উপাদান ডেলিভার করার জন্য রাখুন।",
        "💡 Hint 2: দ্বিতীয় স্ট্যাক ফাঁকা হলে প্রথম স্ট্যাকের সব উপাদান পপ করে দ্বিতীয়টিতে পুশ করলে তাদের ক্রম উল্টে গিয়ে সঠিক FIFO ক্রম তৈরি হবে।"
      ],
      approach: "`stackNewest` এবং `stackOldest` রাখুন। `enqueue`-তে সবসময় `stackNewest`-এ পুশ করুন। `dequeue` বা `peek`-এর সময় `stackOldest` ফাঁকা থাকলে `stackNewest` খালি না হওয়া পর্যন্ত সব পপ করে `stackOldest`-এ পুশ করুন। এতে অপারেশনের amortized time complexity O(1) থাকে।",
      solutions: [
        {
          language: "javascript",
          code: `class MyQueue {
  constructor() {
    this.stackNew = [];
    this.stackOld = [];
  }

  enqueue(val) {
    this.stackNew.push(val);
  }

  _shiftStacks() {
    if (this.stackOld.length === 0) {
      while (this.stackNew.length > 0) {
        this.stackOld.push(this.stackNew.pop());
      }
    }
  }

  dequeue() {
    this._shiftStacks();
    return this.stackOld.pop();
  }

  peek() {
    this._shiftStacks();
    return this.stackOld[this.stackOld.length - 1];
  }
}`,
          explanation: "প্রতিটি এলিমেন্ট সর্বোচ্চ দুইবার পুশ এবং দুইবার পপ হয়, তাই Amortized O(1)।"
        }
      ],
      complexity: { time: "Amortized O(1)", space: "O(n)" }
    }
  ],
  quiz: [
    {
      question: "Stack কোন নীতি অনুসরণ করে চলে?",
      options: ["FIFO (First In, First Out)", "LIFO (Last In, First Out)", "Random Access", "Priority-based"],
      correct: 1,
      explanation: "Stack একটি LIFO ডেটা স্ট্রাকচার — যা সবশেষে যোগ করা হয়, তা সবার আগে বের হয়।"
    },
    {
      question: "JavaScript Array দিয়ে Queue বানানোর সময় `array.shift()` ব্যবহার কেন নিরুৎসাহিত করা হয়?",
      options: [
        "এটি সবসময় null রিটার্ন করে",
        "প্রথম উপাদান সরানোর পর বাকি সব উপাদানকে বামে শিফট করতে O(n) সময় লাগে",
        "এটি মেমোরি লিক ঘটায়",
        "JavaScript-এ shift() মেথডটি deprecated"
      ],
      correct: 1,
      explanation: "Array contiguous হওয়ায় ০-তম ইনডেক্স সরালে বাকি n-১টি উপাদানকে ১ ঘর করে এগিয়ে নিতে হয়, ফলে `shift()` O(n) অপারেশনে পরিণত হয়।"
    },
    {
      question: "Min Stack-এ getMin() অপারেশনের সময় কত হওয়া কাম্য?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correct: 2,
      explanation: "একটি দক্ষ Min Stack অতিরিক্ত পয়েন্টার বা সহায়ক স্ট্যাক ব্যবহারের মাধ্যমে O(1) সময়ে সর্বদা বর্তমান সর্বনিম্ন মান রিটার্ন করে।"
    },
    {
      question: "দুটি Stack দিয়ে বাস্তবায়িত Queue-তে Dequeue অপারেশনের গড় (amortized) জটিলতা কত?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      correct: 0,
      explanation: "উপাদান শিফট করার অপারেশন মাঝে মাঝে ঘটলেও প্রতিটি উপাদান মোট সর্বোচ্চ ২ বার পুশ ও ২ বার পপ হয়, তাই গড়ে amortized O(1)।"
    },
    {
      question: "নিচের কোন প্রবলেমে Monotonic Stack সবচেয়ে কার্যকর?",
      options: [
        "Binary search",
        "Next Greater Element এবং Largest Rectangle in Histogram",
        "Shortest path in weighted graph",
        "Matrix multiplication"
      ],
      correct: 1,
      explanation: "Monotonic stack উপাদানগুলোকে ক্রমবর্ধমান বা হ্রাসমান ক্রমে ধরে রেখে পরবর্তী বৃহত্তর বা ক্ষুদ্রতর উপাদান O(n) এক পাসে খুঁজে দিতে পারে।"
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = chapter03;
}
