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
    licenseNameGithub: licenseNameGithub,     // licenseName from github scraping
    licenseNameRubygems: licenseNameRubygems, // licenseName from rubygems scraping
    githubPath: githubPath,
  };
};

/**
 * Helper Functions
 */
// automatically picks best result
function _pickLicense(licenseNameRubygems, licenseNameGithub) {
  return licenseNameGithub || licenseNameRubygems || null;
}

// scrape license name from rubygems
function _rubygemsLicenseName(dom, rubyGemName) {
  try {
    const targetH2 = dom.window.document.querySelectorAll(".gem__aside > h2")[2];
    return targetH2.querySelector("p").textContent.trim();
  } catch (err) {
    console.warn(`WANR: no license name found on rubygems for gem: ${rubyGemName}`);
    return null;
  }
}
// scrape github repo path from rubygems
function _rubygemsGithubPath(dom, rubyGemName) {
  try {
    const document = dom.window.document;
    const encodedGithubParams = document.querySelector("span#github-btn").dataset.params.split("&");
    const user = encodedGithubParams.find(str => str.startsWith("user")).split("user=")[1];
    const repo = encodedGithubParams.find(str => str.startsWith("repo")).split("repo=")[1];
    return `${user}/${repo}`;

  } catch (err) {
    console.warn(`WARN: no github repo found for gem: ${rubyGemName}`);
    return null;
  }
}
module.exports = rubyGem;