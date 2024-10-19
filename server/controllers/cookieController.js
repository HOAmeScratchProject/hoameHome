const cookieController = {};

/**
 * setCookie - set a cookie
 */
// cookieController.setCookie = (req, res, next) => {
//   res.cookie('sessionId', res.locals.session.id);
//   return next();
// };

// cookieController.setSSIDCookie = (req, res, next) => {
//   console.log("RES LOCALS USERID", res.locals.account.id.toString())
//   res.cookie('ssid', res.locals.user._id.toString(), {
//     httpOnly: true,
//     secure: true
//   });
//   return next()
// }

/**
 * setCookie - set a session cookie (for any session-specific cookies)
 */
cookieController.setCookie = (req, res, next) => {
  //  'ssid' is our primary session identifier
  console.log('setting Cookie')
  res.cookie('ssid', res.locals.session.id, {
    httpOnly: true,
    secure: false, // set secure to false for local development
    maxAge: 60 * 60 * 1000, // 1 hour
  });
  return next();
};


/**
 * setSSIDCookie - set an SSID (Session ID) cookie specifically for user session tracking
 */
cookieController.setSSIDCookie = (req, res, next) => {
  console.log('setting SSIDcookie')
  // Ensure that res.locals.account exists and is properly set
  if (res.locals.account && res.locals.account[0] && res.locals.account[0].id) {
    const userId = res.locals.account[0].id.toString();
    console.log("Setting SSID cookie for userId:", userId);

    res.cookie('ssid', userId, {
      httpOnly: true,
      secure: true, // Use only over HTTPS
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    return next();
  } else {
    // Handle error case if no account found
    console.error("Error: User account is missing in res.locals.");
    return next({
      log: 'cookieController.setSSIDCookie',
      message: { err: 'User ID is missing from res.locals.account' },
    });
  }
};

module.exports = cookieController;

// // --> Stretch - if time allows --->  Set SSID (Session ID) Cookie
// cookieController.setSSIDCookie = (req, res, next) => {
//   //find id
//   const id = res.locals.users.id;
//   // console.log('id:', id);
//   if (id) {
//     // console.log('id exists:', id);
//     res.cookie('ssid', id.toString(), {
//       httpOnly: true,
//       secure: true,
//     });
  
//     return next();
//   } else {
//     const err = new Error('failed to get ssid')
//     return next('Error in cookieController.setSSIDCookie: ' + JSON.stringify(err));
//   }
// };
