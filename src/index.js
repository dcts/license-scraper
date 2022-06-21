const cocoaPod = require("./functions/cocoaPod.js");
const githubRepo = require("./functions/githubRepo.js");
const npmPackage = require("./functions/npmPackage.js");
const rubyGem = require("./functions/rubyGem.js");

const LicenseScraper = {
  npmPackage,
  rubyGem,
  cocoaPod,
  githubRepo,
};

module.exports = LicenseScraper;