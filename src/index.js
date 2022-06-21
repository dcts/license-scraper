const cocoaPods = require("./functions/cocoaPods.js");
const github = require("./functions/github.js");
const npm = require("./functions/npm.js");
const rubyGems = require("./functions/rubyGems.js");

const LicenseScraper = {
  npm,
  rubyGems,
  cocoaPods,
  github,
};

module.exports = LicenseScraper;