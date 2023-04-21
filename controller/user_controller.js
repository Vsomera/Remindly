const { userLogin, userModel } = require("../models/userModels")
let database = require("../database")

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


const addUsertoDb = (user) => {

  // generates a unique id number and pushes to userLogin
  const userId = Math.floor(Math.random() * 900000) + 100000
  userLogin.push({
    id : userId,
    name : user.username,
    email : user.email,
    password: user.password,
  })

  // creates empty reminders array for the user in database.js
  database[user.username] = {
    reminders: []
  }
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  addUsertoDb,
};