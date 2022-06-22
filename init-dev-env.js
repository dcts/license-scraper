// load packages
const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// load scraper
const LicenseScraper = require("./src/index.js");

// load helpers
const { getDom } = require("./src/functions/helper.js");
const test = async (type, name) => {
  if (type === "ruby") {
    console.log(`\n\n💎 RubyGems Testing: ${name}`);
    const res = await LicenseScraper.rubyGem(name);
    console.log(res);
  } else if (type === "pod") {
    console.log(`\n\n🐨 CocoaPods Testing: ${name}`);
    const res = await LicenseScraper.cocoaPod(name);
    console.log(res);
  } else if (type === "npm") {
    console.log(`\n\n💻️ npm Testing: ${name}`);
    const res = await LicenseScraper.npmPackage(name);
    console.log(res);
  }
}

// GREET DEVELOPER
console.log("\n\n");
console.log(fs.readFileSync('init-dev-env-message.txt', 'utf8'));
console.log("\n\n");