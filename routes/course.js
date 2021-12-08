const express = require('express');

const Course = require('../models/course');

function courseRoutes() {
  const router = express.Router();

  router.get('/add', (req, res) => {
    res.render('add.hbs');
  });

  router.get('/:id', (req, res) => {
    const { id } = req.params;

    Course.findById(id).then(course => {
      res.render('detail.hbs', { course });
    });
  });

  router.post('/', (req, res) => {
    const { title, description, price, country, image, duration } = req.body;

    Course.create({
      title,
      description,
      price,
      country,
      image,
      duration,
    }).then(() => res.redirect('/'));
  });

  return router;
}

module.exports = courseRoutes;
