const path = require('path');
const User = require('../models/Users.js');

module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    if (error) {
      const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)

      console.log(req.body)

      req.flash('validationErrors', validationErrors);
      req.flash('data', req.body);
      return res.redirect('/auth/register');
    }
    res.redirect('/');
  });
};
