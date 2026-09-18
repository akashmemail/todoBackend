const bcrypt = require("bcrypt");

const hashpassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparepassword = async (password, hashpassword) => {
  return await bcrypt.compare(password, hashpassword);
};
module.exports = {
  hashpassword,
  comparepassword,
};
