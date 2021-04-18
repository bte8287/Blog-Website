//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
//const _ = require("lodash");
const mongoose = require("mongoose");
const app = express();
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const contactContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

// to get the home page to render the composed posts using mongoDB
//let posts = [];

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
  });

const postSchema = new mongoose.Schema ({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  Post.find({}, function(err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  });
});

app.get("/posts/:postId", function(req, res) {
// new code for mongoDB
  const requestedPostId = req.params.postId;

  Post.findById(requestedPostId, function(err, post) {
    console.log(requestedPostId);
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

  // code before mongoDB
  //const reqPostId = _.lowerCase(req.params.postId);

  // removing this code because we are now using a post._Id for the express routing using mongoDB
  // posts.forEach(function(post) {
  //   const postTitle = _.lowerCase(post.title);

  //   if (reqPostID === postTitle) {
  //     res.render("post", {
  //       postTitle: post.title,
  //       postBody: post.content
  //     });
  //   }
  // });

});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutUs: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactUs: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = new Post ({
    title: req.body.composeTitle,
    content: req.body.composeContent
  });
  //posts.push(post);
  post.save(function(err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
