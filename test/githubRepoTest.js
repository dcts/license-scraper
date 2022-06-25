const test = require('ava');
const LicenseScraper = require("../src/index.js");

// @TODO: add testcases 
const testInputs = [
  {
    name: "1",
    expectedName: "",
    expectedUrl: "",
  },
  {
    name: "2",
    expectedName: "",
    expectedUrl: "",
  },
  {
    name: "3",
    expectedName: "",
    expectedUrl: "",
  },
  {
    name: "4",
    expectedName: "",
    expectedUrl: "",
  },
  {
    name: "5",
    expectedName: "",
    expectedUrl: "",
  },
  {
    name: "6",
    expectedName: "",
    expectedUrl: "",
  },
]

testInputs.forEach(testInputObj => {
  const {name, expectedName, expectedUrl} = testInputObj;
  test(`scraping license for github repository: ${name} (https://github.com/${name})`, async t => {
    try {
      const result = await LicenseScraper.githubRepo(name);
      t.is(expectedName, result.licenseName);
      t.is(expectedUrl, result.licenseUrl);
    } catch(err) {
      t.is(true, "Error thrown: " + err);
    }
  });
})

// @TODO: special cases where github license is "View License"

