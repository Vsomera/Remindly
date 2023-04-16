const passport = require("../middleware/passport")
 
let authController = {
  login: (req, res) => {
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
    res.render("auth/register");
  },
  registerSubmit: (req, res) => {
    // implement
  },
};

module.exports = authController;
