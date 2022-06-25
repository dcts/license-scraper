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
  test(`scraping license for cocoaPod: ${name} (https://cocoapods.org/pods/${name})`, async t => {
    const result = await LicenseScraper.cocoaPod(name);
    t.is(expectedName, result.licenseName);
    t.is(expectedUrl, result.licenseUrl);
  });
})

// @TODO: special cases

