const express = require('express');

const Course = require('../models/course');

function baseRoutes() {
  const router = express.Router();

  router.get('/', (req, res) => {
    const user = 'Ale';

    Course.find().then(courses => {
      console.log('courses', courses);

      const courseWithCurrency = courses.map(course => {
        let currency;
        if (course.country === 'spain') {
          currency = '€';
        } else {
          currency = '$';
        }

        const newCourse = {
          ...course.toObject(),
          // currency: currency,
          currency,
        };
        return newCourse;
      });

      res.render('home.hbs', { name: user, courses: courseWithCurrency });
    });
  })

  return router;
}

module.exports = baseRoutes;