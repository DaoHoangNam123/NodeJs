const fs = require("fs");

const checkDir = (dirName) => {
  return fs.existsSync(dirName);
};
module.exports = { checkDir };
