const cookieController = {};

/**
 * setCookie - set a cookie
 */
cookieController.setCookie = (req, res, next) => {
  res.cookie('sessionId', res.locals.session.id);
  return next();
};

cookieController.setSSIDCookie = (req, res, next) => {
  console.log("RES LOCALS USERID", res.locals.account.id.toString())
  res.cookie('ssid', res.locals.user._id.toString(), {
    httpOnly: true,
    secure: true
  });
  return next()
}

module.exports = cookieController;
