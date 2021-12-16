const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  }
  return res.redirect('/auth/login');
};

module.exports = {
  isLoggedIn,
};
