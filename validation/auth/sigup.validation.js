const {
  emailRegex,
  passwordRegex,
  phoneRegex,
} = require("../regex.validation.js");

const validationsigup = ({ fullname, email, phone, password }) => {
  if (!fullname) {
    return "plz enter your fullname";
  }

  if (!email) {
    return "plz enter email id";
  }

  if (!phone) {
    return "plz enter your Phone number";
  }

  if (!password) {
    return "plz enter your password ";
  }

  if (!emailRegex.test(email)) {
    return "Invlaide email";
  }

  if (!phoneRegex.test(phone)) {
    return "invalide phone number";
  }
  if (!passwordRegex.test(password)) {
    return "Password must be minimum 6 characters and contain uppercase, lowercase, number and special character";
  }

  return null;
};
module.exports = {
  validationsigup,
};
