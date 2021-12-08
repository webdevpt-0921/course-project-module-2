const mongoose = require('mongoose');
const Course = require('../models/course');

const courses = [
  {
    title: 'Web',
    price: 45,
    description: 'best web course in town',
    duration: '24 weeks',
    image: 'cool-kids-discussion',
    country: 'spain',
  },
  {
    title: 'UI/UX',
    price: 25,
    description: 'pinta y colorea',
    duration: '24 weeks',
    image: 'illustration',
    country: 'usa',
  },
  {
    title: 'Data',
    price: 45,
    description: 'best web course in town',
    duration: '24 weeks',
    image: 'cool-kids-discussion',
    country: 'spain',
  },
  {
    title: 'CyberScurity',
    price: 25,
    description: 'hackeando que es gerundio',
    duration: '24 weeks',
    image: 'illustration',
    country: 'portugal',
  },
];

mongoose
  .connect('mongodb://localhost:27017/course-db')
  .then(() => {
    return Course.deleteMany({});
  })
  .then(() => {
    return Course.insertMany(courses);
  })
  .then(courses => {
    console.log(`${courses.length} cursos insertados con exito`);
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('conection closed');
  });
