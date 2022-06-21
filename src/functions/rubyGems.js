/**
 * scrape license name and url for a given ruby gem
 */
const rubyGems = async (rubyGemName) => {
  const url = `https://rubygems.org/gems/${rubyGemName}`;
  return url;
};

module.exports = rubyGems;