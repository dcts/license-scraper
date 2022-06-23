const { getDom } = require("./helper.js");

/**
 * scrape license name and url for a given github repository
 */
const githubRepo = async (githubPath) => {
  const url = `https://github.com/${githubPath}`;
  const dom = await getDom(url);
  const targetDiv = _getTargetDiv(dom, githubPath);
  return {
    licenseNameGithub: targetDiv ? _getLicenseName(targetDiv, githubPath) : null, 
    licenseUrl: targetDiv ? _getLicenseUrl(targetDiv, githubPath) : null,
  }
};
function _getTargetDiv(dom, githubPath) {
  try {
    const document = dom.window.document;
    const XPathResult = dom.window.XPathResult;
    const matchingElement = document.evaluate("//h3[text()='License']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    return matchingElement.nextElementSibling;
     
  } catch(err) {
    console.warn(`WARN: could not find license for https://github.com/${githubPath}`);
    return null;
  }
}
function _getLicenseName(targetDiv, githubPath) {
  try {
    let licenseName = targetDiv.textContent.trim(); // get name
    licenseName = licenseName.split("\n")[0].trim(); // if multi line, only take first line
    return (licenseName === "View license" || licenseName.includes("Unknown")) ? null : licenseName;
  } catch(err) {
    console.warn(`WARN: could not find licenseName for https://github.com/${githubPath}`)
    return null;
  }
}
function _getLicenseUrl(targetDiv, githubPath) {
  try {
    return `https://github.com${targetDiv.querySelector("a").href}`; // get url
  } catch(err) {
    console.warn(`WARN: could not find licenseUrl for https://github.com/${githubPath}`)
    return null;
  }
}

module.exports = githubRepo;