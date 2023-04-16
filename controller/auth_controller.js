let database = require("../database");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    console.log(req.body)
    res.send("POST request received, check console")
  },

  registerSubmit: (req, res) => {
    // implement
  },
};

module.exports = authController;
