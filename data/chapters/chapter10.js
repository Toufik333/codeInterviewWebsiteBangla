/**
 * Chapter 10: System Design & Scalability
 */

const chapter10 = {
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
      content: "Redis এবং Memcached মেমোরিতে কী-ভ্যালু স্টোর করে সাব-মিলিমেকেন্ড লেটেন্সিতে ডেটা দেয়। Cache-aside, Read-through, এবং Write-through কৌশল ব্যবহৃত হয়। Eviction নীতি: LRU (Least Recently Used), LFU (Least Frequently Used)। CDN বিশ্বব্যাপী ব্যবহারকারীর কাছাকাছি স্ট্যাটিক ফাইল ক্যাশ করে সার্ভারের ওপর চাপ কমায়।",
      tips: [
        "Cache Invalidation কম্পিউটার সায়েন্সের সবচেয়ে জটিল বিষয়গুলোর একটি — ডেটা পরিবর্তনের সময় ক্যাশ বাসি (stale) হতে দেওয়া যাবে না।",
        "Hot key সমস্যা এড়াতে ক্যাশের মধ্যে jitter বা randomized TTL যোগ করুন।"
      ]
    },
    {
      title: "Databases & Storage",
      content: "SQL (Relational): ACID ট্রানজ্যাকশন, জটিল JOIN, এবং কাঠামোগত স্কিমার জন্য উপযুক্ত। NoSQL: উচ্চ থ্রুপুট, হরাইজন্টাল পার্টিশনিং, এবং পরিবর্তনশীল ডকুমেন্টের জন্য উপযুক্ত। রেপ্লিকেশন (Master-Slave) রিড স্কেল করে, আর Sharding (Data Partitioning) রাইট স্কেল করে। CAP থিওরেম অনুযায়ী নেটওয়ার্ক পার্টিশনে Consistency এবং Availability-এর মধ্যে একটিকে বেছে নিতে হয়।",
      tips: [
        "Consistent Hashing ব্যবহার করলে নোড যোগ বা বিয়োগের সময় সর্বনিম্ন ডেটা মাইগ্রেশন লাগে।"
      ]
    },
    {
      title: "Key System Design Patterns",
      content: "Microservices বনাম Monolith; ইভেন্ট-ড্রিভেন আর্কিটেকচার (Kafka / RabbitMQ দিয়ে অ্যাসিঙ্ক ডিকাপলিং); API Gateway (অথেন্টিকেশন, রেট লিমিটিং ও রাউটিং); ডেটাবেজ সংযোগের বোঝা কমাতে Connection Pooling।",
      tips: [
        "সিঙ্গেল পয়েন্ট অব ফেইলিউর (SPOF) দূর করতে প্রতিটি স্তরে রিডানড্যান্সি নিশ্চিত করুন।"
      ]
    }
  ],
  problems: [
    {
      id: "10.1",
      title: "Design TinyURL",
      banglaTitle: "ইউআরএল শর্টেনার সিস্টেম ডিজাইন",
      difficulty: "Medium",
      description: "মিলিয়ন ব্যবহারকারীর জন্য একটি সংক্ষিপ্ত ইউআরএল (যেমন bit.ly বা tinyurl) জেনারেটর এবং রিডাইরেকশন সার্ভিস ডিজাইন করুন।",
      examples: [
        { input: "https://www.example.com/very/long/article/path", output: "https://tiny.url/aB3x9Q", explanation: "৬-৮ অক্ষরের একটি অনন্য হ্যাশ কোড দিয়ে রিডাইরেক্ট হয়।" }
      ],
      constraints: ["উচ্চ প্রাপ্যতা (High Availability)", "ন্যূনতম লেটেন্সিতে ৩০১/৩০২ রিডাইরেকশন"],
      hints: [
        "💡 Hint 1: Base62 এনকোডিং ([a-z, A-Z, 0-9]) ব্যবহার করলে মাত্র ৭টি অক্ষরে 62^7 (প্রায় ৩.৫ ট্রিলিয়ন) অনন্য ইউআরএল তৈরি সম্ভব।",
        "💡 Hint 2: রিড ট্র্যাফিক রাইট ট্র্যাফিকের ১০০ গুণ বেশি — তাই একটি উচ্চ ক্ষমতাসম্পন্ন Redis ক্যাশ লেয়ার অত্যন্ত জরুরি।"
      ],
      approach: "১. API ডিজাইন: `POST /api/v1/shorten` এবং `GET /{shortCode}`। ২. আইডি জেনারেশন: Snowflake বা ডিস্ট্রিবিউটেড কাউন্টার দিয়ে অটো-ইনক্রিমেন্ট আইডি তৈরি করে সেটিকে Base62-তে এনকোড করুন। ৩. স্টোরেজ: নোএসকিউএল (যেমন Cassandra/DynamoDB) বা রিলেশনাল ডেটাবেজ। ৪. পারফরম্যান্স: অতি পরিচিত লিঙ্কগুলো Redis-এ ক্যাশ রাখুন।",
      solutions: [
        {
          language: "javascript",
          code: `// Base62 এনকোডার উদাহরণ
const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function encodeId(num) {
  let str = "";
  while (num > 0) {
    str = BASE62[num % 62] + str;
    num = Math.floor(num / 62);
  }
  return str.padStart(6, "0");
}

function decodeCode(code) {
  let num = 0;
  for (let i = 0; i < code.length; i++) {
    num = num * 62 + BASE62.indexOf(code[i]);
  }
  return num;
}`,
          explanation: "স্বতন্ত্র সংখ্যাক্রম থেকে বেস-৬২ অক্ষরের অনন্য কি তৈরি করার অ্যালগরিদম।"
        }
      ],
      complexity: { time: "O(1) encode/decode", space: "O(1)" }
    },
    {
      id: "10.3",
      title: "Design API Rate Limiter",
      banglaTitle: "এপিআই রেট লিমিটিং আর্কিটেকচার",
      difficulty: "Medium",
      description: "প্রতি ইউজারের জন্য প্রতি মিনিটে সর্বোচ্চ ১০০টি রিকোয়েস্ট নিশ্চিত করার জন্য একটি স্কেলেবল API Rate Limiter ডিজাইন করুন।",
      examples: [
        { input: "User sends 101 requests within 1 minute", output: "HTTP 429 Too Many Requests", explanation: "নির্ধারিত কোটা অতিক্রম করায় রিকোয়েস্ট ব্লক করা হয়েছে।" }
      ],
      constraints: ["ন্যূনতম লেটেন্সি ওভারহেড", "ডিস্ট্রিবিউটেড সার্ভার ক্লাস্টারে কাজ করবে"],
      hints: [
        "💡 Hint 1: Token Bucket, Leaky Bucket, বা Sliding Window Counter অ্যালগরিদমের কথা বিবেচনা করুন।",
        "💡 Hint 2: Redis-এর INCR এবং EXPIRE অথবা Lua স্ক্রিপ্ট দিয়ে পরমাণু (atomic) অপারেশন নিশ্চিত করা যায়।"
      ],
      approach: "Token Bucket অ্যালগরিদম সবচেয়ে জনপ্রিয়। প্রতিটি ইউজারের জন্য একটি বালতি (Bucket) থাকবে যাতে নির্দিষ্ট হারে টোকেন যোগ হয়। রিকোয়েস্ট এলে টোকেন থাকলে ১টি কমে এবং রিকোয়েস্ট পাস হয়; খালি থাকলে 429 স্ট্যাটাস ফিরিয়ে দেয়। Redis Lua স্ক্রিপ্ট দিয়ে রেস কন্ডিশন ছাড়া দ্রুততম গতিতে এটি চালানো হয়।",
      solutions: [
        {
          language: "javascript",
          code: `class TokenBucket {
  constructor(capacity, refillRatePerSec) {
    this.capacity = capacity;
    this.refillRate = refillRatePerSec;
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  allowRequest() {
    this.refill();
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }
    return false;
  }

  refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
  }
}`,
          explanation: "টোকেন বাকেট অ্যালগরিদমে স্মৃতি ও সময়ে O(1) কমপ্লেক্সিটি অর্জিত হয়।"
        }
      ],
      complexity: { time: "O(1)", space: "O(1) per user" }
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
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = chapter10;
}
