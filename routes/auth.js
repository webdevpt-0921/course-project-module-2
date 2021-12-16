const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/user');

const saltRounds = 10;

function authRoutes() {
  const router = express.Router();

  router.get('/sign-up', (req, res, next) => {
    res.render('auth/sign-up');
  });

  router.post('/sign-up', async (req, res, next) => {
    const { email, password, repeatedPassword } = req.body;

    if (password !== repeatedPassword) {
      return res.render('auth/sign-up', { errorMessage: 'Password not indentical' });
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
      await User.create({ email, hashedPassword });

      res.redirect('/');
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.render('auth/sign-up', { errorMessage: e.message });
      }
      if (e.name === 'MongoServerError' && e.code === 11000) {
        return res.render('auth/sign-up', { errorMessage: 'email already taken' });
      }
      next(e);
    }
  });

  router.get('/login', (req, res, next) => {
    res.render('auth/login.hbs');
  });

  router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    // check que email y password no estan vacios
    try {
      const dbUser = await User.findOne({ email });

      if (!dbUser) {
        return res.render('auth/login', { errorMessage: 'user Not Found' });
      }
      const { _id, hashedPassword } = dbUser;
      if (bcrypt.compareSync(password, hashedPassword)) {
        req.session.currentUser = {
          _id,
          email,
        };
        res.redirect('/');
      }
      return res.render('auth/login', { errorMessage: 'Password incorrect' });
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = authRoutes;
