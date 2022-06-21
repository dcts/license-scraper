// load packages
const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// load scraper
const LicenseScraper = require("./src/index.js");

// GREET DEVELOPER
console.log("\n\n");
console.log(fs.readFileSync('init-dev-env-message.txt', 'utf8'));
console.log("\n\n");