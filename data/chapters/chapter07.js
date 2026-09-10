/**
 * Chapter 07: Object-Oriented Design
 */

const chapter07 = {
  id: 7,
  title: "Object-Oriented Design",
  icon: "🏗️",
  description: "SOLID নীতি, ডিজাইন প্যাটার্নস, এবং মেইনটেইনেবল ক্লাস আর্কিটেকচার ডিজাইন।",
  concepts: [
    {
      title: "Core OOP Principles",
      content: "চারটি মূল স্তম্ভ: Encapsulation (ডেটা ও মেথড একত্রীকরণ এবং স্টেট লুকানো), Abstraction (জটিল অভ্যন্তরীণ কার্যপদ্ধতি আড়াল করে সহজ ইন্টারফেস দেওয়া), Inheritance (কোড পুনর্ব্যবহার ও হায়ারার্কি তৈরি), এবং Polymorphism (একই মেথড ভিন্ন ভিন্ন ক্লাসে ভিন্ন আচরণ করা)।",
      tips: [
        "Inheritance-এর চেয়ে Composition-কে বেশি অগ্রাধিকার দিন ('favor composition over inheritance')।",
        "ক্লাস ইন্টারফেসে সবসময় পাবলিক মেথড সংক্ষিপ্ত ও সুনির্দিষ্ট রাখুন।"
      ]
    },
    {
      title: "SOLID Principles",
      content: "Single Responsibility (এক ক্লাসের এক উদ্দেশ্য), Open/Closed (পরিবর্তনের জন্য বন্ধ, কিন্তু পরিবর্ধনের জন্য উন্মুক্ত), Liskov Substitution (সাবক্লাস মূল ক্লাসের বিকল্প হিসেবে কাজ করতে সক্ষম), Interface Segregation (বড় ইন্টারফেস ভেঙে ছোট বিশেষায়িত ইন্টারফেস), এবং Dependency Inversion (হাই-লেভেল মডিউল লো-লেভেল মডিউলের ওপর নয়, অ্যাবস্ট্রাকশনের ওপর নির্ভর করবে)।",
      tips: [
        "ইন্টারভিউতে ডিজাইন ব্যাখ্যা করার সময় সরাসরি SOLID টার্মগুলো উল্লেখ করুন — এতে সিস্টেম আর্কিটেকচার সম্পর্কে গভীর ধারণা প্রকাশ পায়।"
      ]
    },
    {
      title: "Common Design Patterns",
      content: "Creational: Singleton (একক ইনস্ট্যান্স), Factory Method (অবজেক্ট তৈরিতে অ্যাবস্ট্রাকশন), Builder (ধাপে ধাপে জটিল অবজেক্ট তৈরি)। Structural: Adapter (অসঙ্গত ইন্টারফেস মেলানো), Decorator (ডাইনামিকালি বৈশিষ্ট্য যোগ)। Behavioral: Observer (পাবলিশ-সাবস্ক্রাইব ইভেন্ট সিস্টেম), Strategy (অ্যালগরিদম পরিবর্তনযোগ্য রাখা)।",
      tips: [
        "Singleton প্যাটার্ন অতিরিক্ত ব্যবহার করবেন না, কারণ এটি ইউনিট টেস্টিংকে কঠিন করে তোলে।"
      ]
    }
  ],
  problems: [
    {
      id: "7.4",
      title: "Parking Lot",
      banglaTitle: "পার্কিং লট সিস্টেম ডিজাইন",
      difficulty: "Medium",
      description: "একটি মাল্টি-লেভেল পার্কিং লট ডিজাইন করার জন্য অবজেক্ট-ওরিয়েন্টেড ক্লাস মডেল তৈরি করুন যা মোটরসাইকেল, গাড়ি এবং বড় বাস জায়গা দিতে সক্ষম।",
      examples: [
        { input: "Vehicle: Car, Level 1", output: "Parked at Spot #104", explanation: "গাড়িটি একটি কমপ্যাক্ট বা রেগুলার স্পটে পার্ক করা হয়েছে।" }
      ],
      constraints: ["মোটরসাইকেল যেকোনো স্পটে, গাড়ি রেগুলার বা লার্জে, এবং বাস পরপর ৫টি লার্জ স্পটে পার্ক করতে পারে"],
      hints: [
        "💡 Hint 1: Vehicle একটি অ্যাবস্ট্রাক্ট ক্লাস হবে যার সাবক্লাস হবে Car, Motorcycle, এবং Bus।",
        "💡 Hint 2: ParkingSpot এবং Level ক্লাসগুলো স্পটের সাইজ এবং প্রাপ্যতা ট্র্যাক করবে।"
      ],
      approach: "মৌলিক ক্লাসগুলো নির্ধারণ করুন: `Vehicle` (আকার ও লাইসেন্স প্লেট), `ParkingSpot` (স্পটের সাইজ ও বর্তমান অবস্থা), `Level` (একটি ফ্লোরের স্পট তালিকা), এবং `ParkingLot` (সম্পূর্ণ পার্কিং লটের নিয়ন্ত্রক)।",
      solutions: [
        {
          language: "javascript",
          code: `class Vehicle {
  constructor(licensePlate, size) {
    this.licensePlate = licensePlate;
    this.size = size; // 'small', 'medium', 'large'
  }
}

class ParkingSpot {
  constructor(id, size) {
    this.id = id;
    this.size = size;
    this.vehicle = null;
  }
  isAvailable() { return this.vehicle === null; }
  park(vehicle) { this.vehicle = vehicle; }
  unpark() { this.vehicle = null; }
}

class ParkingLot {
  constructor(levels) {
    this.levels = levels;
  }
  parkVehicle(vehicle) {
    for (const level of this.levels) {
      const spot = level.findAvailableSpot(vehicle);
      if (spot) {
        spot.park(vehicle);
        return { success: true, spotId: spot.id };
      }
    }
    return { success: false, message: "Full" };
  }
}`,
          explanation: "ক্লিন অবজেক্ট ওরিয়েন্টেড রিলেশনশিপ এবং দায়িত্বের বিভাজন।"
        }
      ],
      complexity: { time: "O(levels × spots) worst case", space: "O(total spots)" }
    }
  ],
  quiz: [
    {
      question: "SOLID নীতির 'S' দিয়ে কী বোঝানো হয়?",
      options: ["System Architecture", "Single Responsibility Principle", "Structured Inheritance", "Static Polymorphism"],
      correct: 1,
      explanation: "Single Responsibility Principle অনুযায়ী একটি ক্লাসের পরিবর্তন হওয়ার ঠিক একটি কারণ থাকা উচিত।"
    },
    {
      question: "'Favor composition over inheritance' নীতির মূল সুবিধা কী?",
      options: [
        "কোড রানটাইম মেমোরি শূন্য হয়ে যায়",
        "টাইট কাপলিং এড়ানো যায় এবং রানটাইমে আচরণ সহজে পরিবর্তন করা যায়",
        "কম্পাইলার স্পিড বাড়ে",
        "সব মেথড স্বয়ংক্রিয়ভাবে পাবলিক হয়ে যায়"
      ],
      correct: 1,
      explanation: "Composition অবজেক্টগুলোকে নমনীয় ও স্বয়ংসম্পূর্ণ রাখে, যা ফ্র্যাজাইল বেস ক্লাস সমস্যা দূর করে।"
    },
    {
      question: "ইন্টারফেস পরিবর্তন না করে অবজেক্টে ডাইনামিকালি নতুন দায়িত্ব যোগ করতে কোন প্যাটার্ন ব্যবহৃত হয়?",
      options: ["Decorator Pattern", "Singleton Pattern", "Prototype Pattern", "Observer Pattern"],
      correct: 0,
      explanation: "Decorator প্যাটার্ন মূল অবজেক্টকে র‍্যাপ করে নতুন ফিচার বা আচরণ সংযোজন করতে দেয়।"
    },
    {
      question: "Liskov Substitution Principle লঙ্ঘন করলে কী সমস্যা দেখা দিতে পারে?",
      options: [
        "প্যারেন্ট ক্লাসের জায়গায় চাইল্ড ক্লাস বসালে অ্যাপ্লিকেশনে অপ্রত্যাশিত ত্রুটি বা ক্র্যাশ হতে পারে",
        "ডাটাবেজ কানেকশন বিচ্ছিন্ন হয়ে যায়",
        "জাভাস্ক্রিপ্টে ভেরিয়েবল স্কোপ নষ্ট হয়",
        "গিট ব্রাঞ্চে কনফ্লিক্ট দেখা দেয়"
      ],
      correct: 0,
      explanation: "LSP নিশ্চয়তা দেয় যে সাবক্লাস অবশ্যই প্যারেন্ট ক্লাসের চুক্তি সম্পূর্ণ পূরণ করবে।"
    },
    {
      question: "সিস্টেমের একাধিক অবজেক্টকে কোনো একটি পরিবর্তনের নোটিফিকেশন পাঠাতে কোন ডিজাইন প্যাটার্ন সেরা?",
      options: ["Observer Pattern", "Adapter Pattern", "Bridge Pattern", "Flyweight Pattern"],
      correct: 0,
      explanation: "Observer প্যাটার্ন একটি এক-থেকে-বহু (one-to-many) নির্ভরশীলতা তৈরি করে যাতে সাবজেক্ট পরিবর্তিত হলে সব পর্যবেক্ষক স্বয়ংক্রিয় আপডেট পায়।"
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = chapter07;
}
