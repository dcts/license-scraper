const test = require('ava');
const LicenseScraper = require("../src/index.js");

// @TODO: add testcases 
const testInputs = [
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
  {
    name: "",
    expectedName: "",
    expectedUrl: "",
  },
]

testInputs.forEach(testInputObj => {
  const {name, expectedName, expectedUrl} = testInputObj;
  test(`scraping license for github repository: ${name} (https://github.com/${name})`, async t => {
    const result = await LicenseScraper.githubRepo(name);
    t.is(expectedName, result.licenseName);
    t.is(expectedUrl, result.licenseUrl);
  });
})

// @TODO: special cases where github license is "View License"

