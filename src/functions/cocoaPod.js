const { getDom } = require("./helper.js");
const githubRepo = require("./githubRepo.js");

/**
 * scrape license name and url for a given cocoa pod package
 */
const cocoaPod = async (podName) => {
  const url = `https://cocoapods.org/pods/${podName}`;
  const dom = await getDom(url);
  const licenseNameCocoapods = _cocoapodsLicenseName(dom, podName);
  
  // scrape github for additional info
  let licenseUrl = null;
  let licenseNameGithub = null; 
  const githubPath = _cocoapodsGithubPath(dom);
  if (githubPath) {
    const githubResult = await githubRepo(githubPath);
    licenseNameGithub = githubResult.licenseNameGithub;
    licenseUrl= githubResult.licenseUrl;
  }
  // collect results
  return {
    licenseName: _pickLicense(licenseNameCocoapods, licenseNameGithub), // automatically chose best result 
    licenseUrl: licenseUrl, // scraped from github
    licenseNameGithub: licenseNameGithub,        // licenseName from github scraping
    licenseNameCocoapods: licenseNameCocoapods,  // licenseName from cocoapods scraping
    githubPath: githubPath,
  };
};

/**
 * Helper Functions
 */
// automatically picks best result
function _pickLicense(licenseNameCocoapods, licenseNameGithub) {
  return licenseNameGithub || licenseNameCocoapods || null;
}
function _cocoapodsLicenseName(dom, podName) {
  try {
    const document = dom.window.document;
    const matchingTr = Array.from(document.querySelectorAll(".header tr")).find(tr => tr.textContent.startsWith("License"));
    return matchingTr.querySelector("td:last-child").textContent.trim();

  } catch(err) {
    console.warn(`WARN: no license found on cocoapods for pod: ${podName}`);
    return null;
  }
}
function _cocoapodsGithubPath(dom, podName) {
  try {
    const document = dom.window.document;
    const matchingA = Array.from(document.querySelectorAll(".links a")).find(a => a.textContent === "GitHub Repo");
    return matchingA.href.split("github.com/")[1]
    
  } catch(err) {
    console.warn(`WARN: no github repo path found on cocoapods for pod: ${podName}`);
    return null;
  }
}

module.exports = cocoaPod;