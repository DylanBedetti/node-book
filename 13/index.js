// libraries
const express = require("express");
const path = require("path"); // provides utilities for working with file and directory paths
const ejs = require("ejs"); // templating engine
const mongoose = require("mongoose"); // MongoDB Connector
const bodyParser = require("body-parser"); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property
const morgan = require("morgan"); // HTTP request logger
const fileUpload = require("express-fileupload"); // file uploader middleware
const expressSession = require("express-session"); // session manager middleware
const flash = require("connect-flash");

// variables
global.loggedIn = null;

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
const logoutController = require("./controllers/logout");
// validating new blogposts
const validateMiddleWare = require("./middleware/validationMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");

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
app.use(
  expressSession({
    secret: "keyboard cat",
  })
);
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});
app.use(flash());

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
app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);
app.post(
  "/user/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);

app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);
app.get("/auth/logout", logoutController);

app.get("/posts/new", authMiddleware, newPostController); // goes from left to right to call the new middleware
app.get("/post/:id", getPostController);
app.get("/search", searchController);
app.post("/posts/store", authMiddleware, storePostController);

// 404 page
app.use((req, res) => res.render("notfound"));
