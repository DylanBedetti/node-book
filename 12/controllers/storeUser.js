const path = require('path');
const User = require('../models/Users.js');

module.exports = (req, res) => {
  // console.log(req.body)
  User.create(req.body, (error, user) => {
    if (error) {
      console.log(error);
      console.log(error.name)

      // const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
      // const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)

      // console.log(validationErrors)
      req.session.validationErrors = error.name;
      return res.redirect('/auth/register');
    }
    res.redirect('/');
  });
};
