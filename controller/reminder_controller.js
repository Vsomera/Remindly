let database = require("../database");
const { ensureAuthenticated } = require("../middleware/checkAuth")

let remindersController = {
  list: [
    ensureAuthenticated, // ensures the user is logged in
    (req, res) => {
      const username = req.user.name
      const userReminders = database[username].reminders // only shows reminders made by the user
      res.render("reminder/index", { reminders: userReminders });
    }
  ],

  new: [
    ensureAuthenticated,
    (req, res) => {
      res.render("reminder/create");
    }
  ],

  listOne: [
    ensureAuthenticated,
    (req, res) => {
      const username = req.user.name
      let reminderToFind = req.params.id;
      let searchResult = database[username].reminders.find(function (reminder) {
        return reminder.id == reminderToFind;
      });
      if (searchResult != undefined) {
        res.render("reminder/single-reminder", { reminderItem: searchResult });
      } else {
        res.render("reminder/index", { reminders: database[username].reminders });
      }
    }
  ],

  create: [
    ensureAuthenticated,
    (req, res) => {
      const username = req.user.name
      let reminder = {
        id: database[username].reminders.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
      };
      database[username].reminders.push(reminder);
      res.redirect("/reminders");
    }
  ],

  edit: [
    ensureAuthenticated,
    (req, res) => {
      const username = req.user.name

      let reminderToFind = req.params.id;
      let searchResult = database[username].reminders.find(function (reminder) {
        return reminder.id == reminderToFind;
      });
      res.render("reminder/edit", { reminderItem: searchResult });
    }
  ],

  update: [
    ensureAuthenticated,
    (req, res) => {
      // gets the id of the reminder from endpoint
      const id = req.params.id;
      const username = req.user.name

      // returns the reminder from database that matches the id and updates it accordingly
      database[username].reminders.find((reminder) => {
        if (reminder.id == id) {
          reminder.title = req.body.title;
          reminder.description = req.body.description;
          reminder.completed = req.body.completed === "true";
        }
      });

      // redirects to reminders page
      res.redirect("/reminders");
    }
  ],

  delete: [
    ensureAuthenticated,
    (req, res) => {
      const username = req.user.name
      // gets the id of the reminder from endpoint
      const id = req.params.id;

      // filters reminder from database if id matches
      const newReminders = database[username].reminders.filter(
        (reminder) => reminder.id != id
      );

      // overwrites database with the new reminders array
      database[username].reminders = newReminders;
      res.redirect("/reminders");
    }
  ],
};

module.exports = remindersController;
