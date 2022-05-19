const axios = require("axios");

module.exports = async (pkgName) => {
  try {
    const res = await axios.get(`http://registry.npmjs.org/${pkgName}/latest`);
    return res.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};
