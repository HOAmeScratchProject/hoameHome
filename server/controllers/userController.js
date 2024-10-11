const db = require('../models/hoameModels.js');

const userController = {};

/**
 * getAllUsers - retrieve all users from the database and stores it into res.locals
 * before moving on to next middleware.
 */
userController.getAllUsers = async (req, res, next) => {
  try {
    const getUsersString = 'SELECT * FROM users';
    const usersResult = await db.query(getUsersString);
    console.log('usersResult ', usersResult);
    const users = usersResult.rows;
    res.locals.users = users;
    next();
  } catch (err) {
    console.log(err);
    next({
      log: 'getAllUsers',
      message: {
        err: 'userController.getAllUsers ERROR: Check server logs for details',
      },
    });
  }
  // if a database error occurs, call next with the error message passed in
  // for the express global error handler to catch
  //   if (err)
  //     return next('Error in userController.getAllUsers: ' + JSON.stringify(err));

  // store retrieved users into res.locals and move on to next middleware
  //   res.locals.users = users;
  //   return next();
};

module.exports = userController;
