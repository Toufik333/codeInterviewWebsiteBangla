/**
 * Data Aggregator Module
 * Combines all modular chapters, learning tracks, and achievement milestones.
 */

const chapter01 = require("./chapters/chapter01");
const chapter02 = require("./chapters/chapter02");
const chapter03 = require("./chapters/chapter03");
const chapter04 = require("./chapters/chapter04");
const chapter05 = require("./chapters/chapter05");
const chapter06 = require("./chapters/chapter06");
const chapter07 = require("./chapters/chapter07");
const chapter08 = require("./chapters/chapter08");
const chapter09 = require("./chapters/chapter09");
const chapter10 = require("./chapters/chapter10");

const TRACKS = require("./tracks");
const MILESTONES = require("./milestones");

const CHAPTERS = [
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
  chapter06,
  chapter07,
  chapter08,
  chapter09,
  chapter10
];

if (typeof window !== "undefined") {
  window.CHAPTERS = CHAPTERS;
  window.TRACKS = TRACKS;
  window.MILESTONES = MILESTONES;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    CHAPTERS,
    TRACKS,
    MILESTONES
  };
}
