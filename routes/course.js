const express = require('express');
const async = require('hbs/lib/async');

const Course = require('../models/course');
const Favorite = require('../models/favorite');

function courseRoutes() {
  const router = express.Router();

  // domain/course/add
  router.get('/add', (req, res) => {
    res.render('course/add.hbs');
  });

  // domain/course/:id
  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const course = await Course.findById(id);

      res.render('course/detail.hbs', { course });
    } catch (e) {
      console.log('e', e);
      next(e);
    }
  });

  router.get('/:id/edit', async (req, res, next) => {
    const { id } = req.params;

    try {
      const course = await Course.findById(id);
      res.render('course/edit.hbs', { course });
    } catch (e) {
      next(e);
    }
  });

  router.post('/', async (req, res, next) => {
    const { title, description, price, country, image, duration } = req.body;

    try {
      await Course.create({
        title,
        description,
        price,
        country,
        image,
        duration,
      });

      res.redirect('/');
    } catch (e) {
      next(e);
    }
  });

  router.post('/:id/delete', async (req, res, next) => {
    const { id } = req.params;

    try {
      await Course.findByIdAndDelete(id);
      res.redirect('/');
    } catch (e) {
      next(e);
    }
  });

  router.post('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { title, price, duration, description, country, image } = req.body;

    try {
      await Course.findByIdAndUpdate(id, { title, price, duration, description, country, image });
      res.redirect(`/course/${id}/edit`);
    } catch (e) {
      next(e);
    }
  });

  // /course/:id/favorite
  router.post('/:id/favorite', async (req, res, next) => {
    const { id: courseId } = req.params;
    const { _id: userId } = req.session.currentUser;

    try {
      const favoriteCreated = await Favorite.create({
        user: userId,
        course: courseId,
      });

      res.redirect('/');
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = courseRoutes;
