const path = require('path');
const User = require('../models/Users.js');

module.exports = (req, res) => {
  // console.log(req.body)
  User.create(req.body, (error, user) => {
    if (error) {
      return res.redirect('/auth/register');
      console.log(error, user);
    }
    res.redirect('/');
  });
};
