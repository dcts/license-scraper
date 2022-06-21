/**
 * scrape license name and url for a given cocoa pod package
 */
const cocoaPods = async (podName) => {
  const url = `https://cocoapods.org/pods/${podName}`;
  return url;
};

module.exports = cocoaPods;