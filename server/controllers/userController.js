const db = require('../models/hoameModels.js');
//const roleController = require("./server/controllers/roleController");
const roleController = require("../controllers/roleController");


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
      "INSERT into users (first_name, last_name, street_address, phone, username, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const newUser = await db.query(signupString, [
      first_name,
      last_name,
      street_address,
      phone,
      username,
      password,
    ]);
    // Check if newUser.rows is populated
    if (!newUser.rows.length) {
      return next({
        log: "signup",
        message: { err: "User signup failed, no user returned." },
      });
    }

    res.locals.account = newUser.rows;
    // Debugging log to check if account is populated
    console.log("Signup successful, res.locals.account:", res.locals.account);
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
      'SELECT id, username, password FROM users WHERE username = $1';
    // store as lowercase fir ease
    const user = await db.query(loginString, [username.toLowerCase()]);
    // check for no user found and if no user then login failure and en
    if(user.rowCount === 0) {
      res.locals.login = false;
    return res.status(401).json({ message:'Invalid username or password'});
    }
    // compare password to hashed password in db
    if (password === user.rows[0].password) {
      console.log("login successful", user.rows[0]);
      const userId = user.rows[0].id;
      const roles = await roleController.getUserRoles(userId); // Fetch roles
      res.locals.login = true;
      res.locals.account = [{ ...user.rows[0], roles }];
        //  console.log(
        //    "Login successful, res.locals.account:",
        //    res.locals.account
        //  );

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

// userController.verifyUser = async (req, res, next) => {
//   const { username, password } = req.body;

//   if (!username || !password) return res.redirect('/signup');

//   try {
//     const findUserString =
//       'SELECT * from users WHERE username=$1 AND password=$2';

//     const findUser = await db.query(findUserString, [username, password]);
//     if (password === user.rows[0].password) {
//       console.log('login successful');
//       res.locals.user = findUser.rows;
//       return next ()
//     }
//   } catch (err) {
//     return next(`Error in userController.verifyUser: ${err}`);
//   }
// }

module.exports = userController;
