/**
 * scrape license name and url for a given npm package
 */
const npm = async (packageName) => {
  const url = `https://npmjs.com/package/${packageName}`;
  return url;
  // const xpath = "//h3[text()='License']";
  // const matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  // const targetP = matchingElement.nextElementSibling;
  // return targetP.textContent.trim();
};

module.exports = npm;