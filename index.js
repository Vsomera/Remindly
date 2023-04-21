const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.set("view engine", "ejs");

app.use(
  session({           // session is default configured by node docs
    secret: "secret", // makes cookie stored in the browser digitally signed
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Initializes passport.js
const passport = require("./middleware/passport")
app.use(passport.initialize())
app.use(passport.session())

// Session Details
app.use((req, res, next) => {
    console.log("User details are:" );
    console.log(req.user);

    console.log("Entire session object:");
    console.log(req.session);

    console.log("Session details are:" );
    console.log(req.session.passport);
    next();
});

// Routes start here

app.get("/reminders", reminderController.list);

app.get("/reminder/new", reminderController.new);

app.get("/reminder/:id", reminderController.listOne);

app.get("/reminder/:id/edit", reminderController.edit);

app.post("/reminder/", reminderController.create);

app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);

// Register Routes
app.get("/register", authController.register);
app.post("/register", authController.registerSubmit);

// Login Routes
app.get("/login", authController.login);
app.post("/login", authController.loginSubmit);

// Logout Route 
app.get("/logout", (req, res) => {
  // when called, logs out the currently signed in user
  req.logout((err) => {
    err && next(err)     
    // redirects to login page
    res.redirect('/login');
  });
});

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});

