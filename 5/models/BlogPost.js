// Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose')
// Creating a Model through a Schema interface
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  body: String
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

module.exports = BlogPost