const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

// Model
const Post = require("./models/post");

// express app - big chain of middleware
const app = express();

// connect to DB
mongoose.connect("mongodb+srv://gabo:gabo@cluster0-orqtt.mongodb.net/test?retryWrites=true")
  .then( () => {
    console.log("Connected to Database!");
  })
  .catch(err => {
    console.error(err);
  });

// filtering
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// middle ware for cors
app.use( (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next(); /// continue to the next middleware
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  // store in database
  post.save()  // for every model we get a save method to store in db (creates right query to insert to db)
    .then(result => {
      // created 201
      res.status(201).json({
        message: 'SUCCESS CREATED',
        postId: result.id
      });
    });
});

// first argument is the filtering
// uses middleware in the app: MIDDLEWARE => FUNNEL
app.get('/api/posts', (req, res, next) => {

  // return all the entries
  // configure the results
  // function will trigger once done - CB
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: "SUCCESS",
        posts: documents
      });
    })
    .catch(err => {
      console.error(err);
    });
});

// to access the params: req.params.id
app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({
    _id: req.params.id
  })
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "post deleted"
      });
    })
});

// exporting the entire express app ?
module.exports = app;
