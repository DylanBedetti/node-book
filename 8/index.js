// libraries
const express = require("express");
const path = require("path"); // provides utilities for working with file and directory paths
const ejs = require("ejs"); // templating engine
const mongoose = require("mongoose"); // MongoDB Connector
const bodyParser = require("body-parser"); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property
const morgan = require("morgan"); // HTTP request logger
const fileUpload = require("express-fileupload"); // file uploader middleware

// imports
const BlogPost = require("./models/BlogPost.js");
const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const searchController = require("./controllers/search");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
// validating new blogposts
const validateMiddleWare = require("./middleware/validationMiddleware");

// creating express app
const app = new express();

// app settings
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(fileUpload());
app.use("/posts/store", validateMiddleWare);

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
app.get("/", homeController);
app.get("/posts/new", newPostController);
app.get("/post/:id", getPostController);
app.get("/search", searchController);
app.get("/auth/register", newUserController);
app.get("/auth/login", loginController);

app.post("/posts/store", storePostController);
app.post("/user/register", storeUserController);
app.post("/users/login", loginUserController);
