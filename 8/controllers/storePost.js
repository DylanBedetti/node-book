const path = require('path');
const BlogPost = require('../models/BlogPost.js');

module.exports = (req, res) => {
  console.log(req.body);
  const { image } = req.files;
  image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async (error) => {
    await BlogPost.create({
      ...req.body, // spread operator
      image: `/img/${image.name}`,
    });
    res.redirect('/');
  });
};
