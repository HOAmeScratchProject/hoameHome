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
    // console.log('usersResult ', usersResult);
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
};

userController.signup = async (req, res, next) => {
  let { first_name, last_name, street_address, phone, username, password } =
    req.body;
  //Filters aspects inside of username and phone to make it easier for different kinds of inputs
  phone = phone.replaceAll('-', '');
  username = username.toLowerCase();
  try {
    const signupString =
      'INSERT into users (first_name, last_name, street_address, phone, username, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const newUser = await db.query(signupString, [
      first_name,
      last_name,
      street_address,
      phone,
      username,
      password,
    ]);
    res.locals.account = newUser.rows;
    return next();
  } catch (err) {
    console.log(err);
    next({
      log: 'signup',
      message: {
        err: 'userController.signup ERROR: Check server logs for details',
      },
    });
  }
};

userController.login = async (req, res, next) => {
  let { username, password } = req.body;
  try {
    const loginString =
      'SELECT username, password FROM users WHERE username = ($1)';

    let user = await db.query(loginString, [username]);
    if (password === user.rows[0].password) {
      console.log('login successful');
      res.locals.login = true;  // /////// front end expecting true or false response regarding login
    } else {
      res.locals.login = false;
      console.log('login not successful try again');
    }
    return next();
  } catch (err) {
    // Using console.error vs console.log to specifically log an error object for handling errors.
    console.error('Error in userController.login.js: ', err);
    return next({
      log: `Error in userController.login ERROR:` + err,
      status: 500, // Internal server error
      // Message users see.
      message: {
        err: 'An error occurred logging in. Please try again later.',
      },
    });
  }
};

module.exports = userController;
