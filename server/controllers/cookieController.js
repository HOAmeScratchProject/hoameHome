const cookieController = {};

/**
 * setCookie - set a cookie
 */
cookieController.setCookie = (req, res, next) => {
  res.cookie('sessionId', res.locals.session.id);
  return next();
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
