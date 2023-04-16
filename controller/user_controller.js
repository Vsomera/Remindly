const userModel = require("../models/userModels").userModel;

const getUserByEmailIdAndPassword = (email, password) => {

  let user = userModel.findOne(email); // finds user in db by email
  if (user) {
    if (isUserValid(user, password)) {
      return user; // returns True if user login details are correct
    }
  }
  return null;
};
const getUserById = (id) => {
    // finds the user ID for passport session
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
    // checks if user password matches database password
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
};