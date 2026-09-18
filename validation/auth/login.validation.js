const {
  emailRegex,

  passwordRegex,
} = require("../regex.validation");

const validationlogin = ({ email, password }) => {
  if (!email) {
    return "plz enter email id";
  }
  if (!password) {
    return "plz enter password";
  }

  if (!emailRegex.test(email)) {
    return "email id indevalid";
  }

  if (!passwordRegex.test(password)) {
    return "Password must be minimum 6 characters and contain uppercase, lowercase, number and special character";
  }

  return null;
};

module.exports = { validationlogin };
