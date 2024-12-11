const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    return res.status(403).json({ errors: ['not authenticated'] });
  }
};

module.exports = { isAuthenticated }