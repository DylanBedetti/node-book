// libraries
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

// creating express app
const app = new express();

// app settings
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended}))

// database connection
mongoose.connect("mongodb://localhost:27017/my_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post", (req, res) => {
  res.render("post");
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.post("/posts/store", (req, res) => {
  console.log(req)
  console.log(req.body)
  res.redirect('/')
}) 