const { getDom } = require("./helper.js");
const githubRepo = require("./githubRepo.js");

/**
 * scrape license name and url for a given ruby gem
 */
const rubyGem = async (rubyGemName) => {
  const url = `https://rubygems.org/gems/${rubyGemName}`;
  const dom = await getDom(url);
  const licenseNameRubygems = _rubygemsLicenseName(dom, rubyGemName);
  
  // scrape github for additional info
  let licenseUrl = null;
  let licenseNameGithub = null; 
  const githubPath = _rubygemsGithubPath(dom, rubyGemName);
  if (githubPath) {
    const githubResult = await githubRepo(githubPath);
    licenseNameGithub = githubResult.licenseNameGithub;
    licenseUrl= githubResult.licenseUrl;
  }
  // collect results
  return {
    licenseName: _pickLicense(licenseNameRubygems, licenseNameGithub), // automatically chose best result 
    licenseUrl: licenseUrl, // scraped from github
    licenseNameGithub: licenseNameGithub, // licenseName from github scraping
    licenseNameRubygems: licenseNameRubygems,       // licenseName from rubygems scraping
    githubPath: githubPath,
  };
};
function _pickLicense(licenseNameRubygems, licenseNameGithub) {
  return licenseNameGithub || licenseNameRubygems || null;
}
function _rubygemsLicenseName(dom, rubyGemName) {
  try {
    const targetH2 = dom.window.document.querySelectorAll(".gem__aside > h2")[2];
    return targetH2.querySelector("p").textContent.trim();
  } catch (err) {
    console.warn(`WANR: no license name found on rubygems for gem: ${rubyGemName}`);
    return null;
  }
}
function _rubygemsGithubPath(dom, rubyGemName) {
  try {
    const document = dom.window.document;
    const XPathResult = dom.window.XPathResult;
    const matchingElement = document.evaluate("//a[text()='Source Code']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    return matchingElement.href.split("github.com/")[1];

  } catch (err) {
    console.warn(`WARN: no github repo found for gem: ${rubyGemName}`);
    return null;
  }
}
module.exports = rubyGem;