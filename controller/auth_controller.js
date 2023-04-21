const passport = require("../middleware/passport")
const { userLogin } = require("../models/userModels")
const { addUsertoDb } = require("../controller/user_controller")

let authController = {
  login: (req, res) => {
    if (req.user) { // req.user contains dict of signed in user from db
      // If the user is already logged in, redirect to the reminders page
      return res.redirect('/reminders');
    }
    res.render("auth/login"); // renders the login.ejs page
  },

  loginSubmit: (req, res, next) => {
    // Use the 'local strategy to authenticate the user located in /middleware/passport
    passport.authenticate('local', (err, user) => {

      // Handle any authentication errors or if no user is found
      if (err || !user) {
        return res.redirect('/login'); // Redirect user to login page if user details are invalid
      }

      // authenticates the user and redirect them to the reminders page
      req.logIn(user, (err) => {
        if (err) return next(err); // handles errors during authentication
        res.redirect('/reminders'); // redirects to /reminders
      });
    })(req, res, next); // pass along the request, response, and next middleware
  },



  register: (req, res) => {
    if (req.user) { // req.user contains dict of signed in user from db
      // If the user is already logged in, redirect to the reminders page
      return res.redirect('/reminders');
    }
    res.render("auth/register"); // renders the register page in the browser
    // renders the registration page
  },

  registerSubmit: (req, res) => {
    // object containing errors
    let errors = {};

    // checks if an email is typed
    if (req.body.email === '') {
      errors.emailError = 'Please enter an email';
    } 
    // checks if the email is associated with an account in the database
    const email = userLogin.find((user) => user.email === req.body.email);
    if (email) {
      // adds error to errors object
      errors.emailError = 'Email already associated with an account. Please try another email';
    }

    // checks if a username is typed
    if (req.body.username === '') {
      errors.nameError = 'Please enter a username';
    } 
    // checks if the name is associated with an account in the database
    const name = userLogin.find((user) => user.name === req.body.username);
    if (name) {
      errors.nameError = 'Username already associated with an account. Please try another username';
    }


    // checks if a password is typed
    if ((req.body.password || req.body.confirmPassword) == '') {
      errors.passError = 'Please enter a password';
    }
    // checks if the passwords match
    if (req.body.password !== req.body.confirmPassword) {
      errors.passError = 'Passwords do not match. Please re enter your password';
    }

    if (Object.keys(errors).length > 0) {
      // if there are errors -> renders the register page with the error messages
      res.render('auth/register', errors);
    } else {
      // Push to database
      addUsertoDb(req.body)
      // redirect to login page
      res.render('auth/login', {regComplete : "Registration Completed! Please Log In"});
    }
  },
};

module.exports = authController;
