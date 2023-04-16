const userLogin = [
    {
      id: 1,
      name: "Cindy Lao",
      email: "cindy123@gmail.com",
      password: "cindy123!",
    },
    {
      id: 2,
      name: "Alex Doe",
      email: "alex123@gmail.com",
      password: "alex123!",
    },
    {
      id: 3,
      name: "Jonathan Chen",
      email: "jonathan123@gmail.com",
      password: "jonathan123!",
    },
  ];

const userModel = {
    findOne: (email) => {
      // finds user by email in the userLogin database
      const user = userLogin.find((user) => user.email === email);
      if (user) {
        return user;
      }
      throw new Error("Couldn't find user with email: ${email}");
    },
    findById: (id) => {
      // finds user by id in the userLogin database
      const user = userLogin.find((user) => user.id === id);
      if (user) {
        return user;
      }
      throw new Error("Couldn't find user with id: ${id}");
    },
  };
  
  module.exports = { userLogin, userModel };