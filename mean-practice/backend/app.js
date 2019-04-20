const express = require('express');
const bodyParser = require('body-parser');

// express app - big chain of middleware
const app = express();

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
  const post = req.body;
  console.log(post);
  // created 201
  res.status(201).json({
    message: 'SUCCESS CREATED'
  });
});

// first argument is the filtering
// uses middleware in the app: MIDDLEWARE => FUNNEL
app.get('/api/posts', (req, res, next) => {
  const posts = [
    { id: "1", title: "First Title", content: "This is coming from the server"},
    { id: "2", title: "First Title1", content: "This is coming from the server1"},
    { id: "3", title: "First Title2", content: "This is coming from the server2"}
  ];
  res.status(200).json({
    message: "SUCCESS",
    posts: posts
  });
});

// exporting the entire express app ?
module.exports = app;
