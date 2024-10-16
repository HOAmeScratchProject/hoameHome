const cookieController = {};

/**
 * setCookie - set a cookie
 */
cookieController.setCookie = (req, res, next) => {
  res.cookie('sessionId', res.locals.session.id);
  return next();
};

module.exports = cookieController;
