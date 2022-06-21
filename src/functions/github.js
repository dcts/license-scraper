/**
 * scrape license name and url for a given github repository
 */
const github = async (githubPath) => {
  const url = `https://github.com/${githubPath}`;
  return url;

  // try {
  //   const xpath = "//h3[text()='License']";
  //   const matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  //   const targetDiv = matchingElement.nextElementSibling;
  //   const name = _getLicenseName(targetDiv);
  //   const url = _getLicenseUrl(targetDiv);
  //   return { name, url };
  // } catch(err) {
  //   console.log(err);
  //   return null;
  // }
};

function _getLicenseName(targetDiv) {
  try {
    return targetDiv.textContent.trim(); // get name
  } catch(err) {
    return null;
  }
}
function _getLicenseUrl(targetDiv) {
  try {
    return targetDiv.querySelector("a").href; // get url
  } catch(err) {
    return null;
  }
}

module.exports = github;