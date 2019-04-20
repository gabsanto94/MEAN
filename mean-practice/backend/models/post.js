const mongoose = require("mongoose");

// create schema - Blueprint ( contains configuration )
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    require: true
  }
});

// in order to create a model object based on the Schema ... we need to turn definition to model
// exporting model - able to create an object with NEW in app.js
// Collection will be created with plurar form of the variable -> Post
module.exports = mongoose.model('Post', postSchema);
