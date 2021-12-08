const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: "string",
  price: "string",
  duration: "string",
  description: "string",
  image: "string",
  country: "string",
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
