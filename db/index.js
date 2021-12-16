const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/course-db';

function startDB() {
  return mongoose.connect(MONGO_URI);
}

function stopDB() {
  return mongoose.connection.close();
}

module.exports = { startDB, stopDB, MONGO_URI };
