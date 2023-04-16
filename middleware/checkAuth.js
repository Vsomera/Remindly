module.exports = {
    ensureAuthenticated: function (req, res, next) {
      if (req.isAuthenticated()) { // returns true if the user has a session
        return next(); // tells passport to move forward
      }
      res.redirect("/login"); // if user does not have a session redirect to login
    },
  };

