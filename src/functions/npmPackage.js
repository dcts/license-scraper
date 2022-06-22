const { getDom } = require("./helper.js");
const githubRepo = require("./githubRepo.js");

/**
 * scrape license name and url for a given npm package
 */
const npmPackage = async (packageName) => {
  // scrape npm
  const url = `https://npmjs.com/package/${packageName}`;
  const dom = await getDom(url);
  const licenseNameNpm = _npmLicenseName(dom);
  
  // scrape github for additional info
  let licenseUrl = null;
  let licenseNameGithub = null; 
  const githubPath = _npmGithubPath(dom);
  if (githubPath) {
    const githubResult = await githubRepo(githubPath);
    licenseNameGithub = githubResult.licenseNameGithub;
    licenseUrl= githubResult.licenseUrl;
  }
  // collect results
  return {
    licenseName: _pickLicense(licenseNameNpm, licenseNameGithub), // automatically chose best result 
    licenseUrl: licenseUrl, // scraped from github
    licenseNameGithub: licenseNameGithub, // licenseName from github scraping
    licenseNameNpm: licenseNameNpm,       // licenseName from npm scraping
    githubPath: githubPath,
  };
};

/**
 * Helper Functions
 */
// picks license, important if 2 conflicting licenses found
// on github and npm
function _pickLicense(licenseNameNpm, licenseNameGithub) {
  return licenseNameGithub || licenseNameNpm || null;
}
// scrape github path from npmjs.com
function _npmGithubPath(dom) {
  try {
    const document = dom.window.document;
    const XPathResult = dom.window.XPathResult;
    const matchingElement = document.evaluate("//h3[text()='Repository']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    const targetP = matchingElement.nextElementSibling;
    return targetP.textContent.trim().split("github.com/")[1];
    
  } catch(err) {
    console.log(err);
    return null;
  }
}
// scrape license from npmjs.com
function _npmLicenseName(dom) {
  try {
    const document = dom.window.document;
    const XPathResult = dom.window.XPathResult;
    const matchingElement = document.evaluate("//h3[text()='License']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    const targetP = matchingElement.nextElementSibling;
    return targetP.textContent.trim();
     
  } catch(err) {
    console.log(err);
    return null;
  }
}

module.exports = npmPackage;