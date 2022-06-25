const test = require('ava');
const LicenseScraper = require("../src/index.js");

// @TODO: add more testcases 
const testInputs = [
  {
    name: "opensea-scraper",
    expectedName: "MIT",
    expectedUrl: "inputhere...",
  },
  {
    name: "",
    expectedName: "",
    expectedUrl: "",
  },
  {
    name: "",
    expectedName: "",
    expectedUrl: "",
  },
  {
    name: "",
    expectedName: "",
    expectedUrl: "",
  },
  {
    name: "",
    expectedName: "",
    expectedUrl: "",
  },
  {
    name: "",
    expectedName: "",
    expectedUrl: "",
  },
]

testInputs.forEach(testInputObj => {
  const {name, expectedName, expectedUrl} = testInputObj;
  test(`scraping license for npm package ${name}`, async t => {
    const result = await LicenseScraper.npmPackage("opensea-scraper");
    t.is(expectedName, result.licenseName);
    t.is(expectedUrl, result.licenseUrl);
  });
})

// @TODO: special cases where npmLicense is "NOASSETION"
// @TODO: special cases where github license is "View License"

