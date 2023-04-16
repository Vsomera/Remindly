let database = require("../database");
const { ensureAuthenticated } = require("../middleware/checkAuth")

let remindersController = {
  list: [
    ensureAuthenticated,
    (req, res) => {
      res.render("reminder/index", { reminders: database.cindy.reminders });
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
      let reminderToFind = req.params.id;
      let searchResult = database.cindy.reminders.find(function (reminder) {
        return reminder.id == reminderToFind;
      });
      if (searchResult != undefined) {
        res.render("reminder/single-reminder", { reminderItem: searchResult });
      } else {
        res.render("reminder/index", { reminders: database.cindy.reminders });
      }
    }
  ],

  create: [
    ensureAuthenticated,
    (req, res) => {
      let reminder = {
        id: database.cindy.reminders.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
      };
      database.cindy.reminders.push(reminder);
      res.redirect("/reminders");
    }
  ],

  edit: [
    ensureAuthenticated,
    (req, res) => {
      let reminderToFind = req.params.id;
      let searchResult = database.cindy.reminders.find(function (reminder) {
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

      // returns the reminder from database that matches the id and updates it accordingly
      database.cindy.reminders.find((reminder) => {
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
      // gets the id of the reminder from endpoint
      const id = req.params.id;

      // filters reminder from database if id matches
      const newReminders = database.cindy.reminders.filter(
        (reminder) => reminder.id != id
      );

      // overwrites database with the new reminders array
      database.cindy.reminders = newReminders;
      res.redirect("/reminders");
    }
  ],
};

module.exports = remindersController;
