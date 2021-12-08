const express = require('express');
const handlebars = require('hbs');

const baseRoutes = require('./routes/base');
const courseRoutes = require('./routes/course');

handlebars.registerPartials(`${__dirname}/views/partials`);

function setupApp() {
  const app = express();
  app.set('view engine', 'hbs');
  // app.set("views", __dirname + "/pages");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  app.get('/', baseRoutes());

  app.get('/login', (req, res) => {
    res.render('login.hbs');
  });

  app.use('/course', courseRoutes());

  return app;
}

module.exports = setupApp;
