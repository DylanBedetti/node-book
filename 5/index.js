// libraries
const express = require("express");
const path = require("path"); // provides utilities for working with file and directory paths
const ejs = require("ejs"); // templating engine
const mongoose = require("mongoose"); // MongoDB Connector
const bodyParser = require("body-parser") // Parse incoming request bodies in a middleware before your handlers, available under the req.body property
const morgan = require('morgan') // HTTP request logger



// imports
const BlogPost = require('./models/BlogPost.js')

// creating express app
const app = new express();

// app settings
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))

// database connection
mongoose.connect("mongodb://localhost:27017/my_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// defining app port
app.listen(3000, () => {
  console.log("App listening on port 3000");
});

// defining app routes!
app.get("/", async (req, res) => {
  // find and return everything within blogposts
  const blogposts = await BlogPost.find({})
  res.render("index", {
    blogposts
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/search", (req, res) => {
  res.render("search");
});

app.get("/post", (req, res) => {
  res.render("post");
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.post("/posts/store", async (req, res) => {
  // console.log(req.body)
  await BlogPost.create(req.body)
  res.redirect('/')
}) 