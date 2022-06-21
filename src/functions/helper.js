const axios = require("axios");
const { JSDOM } = require("jsdom");

const getDom = async (url) => {
  const response = await axios.get(url);
  if (response.status !== 200) {
    throw new Error(`Status: ${response.status}`);
  }
  return new JSDOM(response.data);
} 

module.exports = {
  getDom,
};