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
};

userController.signup = async (req, res, next) =>{


  const {username, password} = req.body;
 
  try{
  const signupString = 'INSERT into login_info (username, password) VALUES ($1, $2) RETURNING *'
  }
  catch(err){
    console.log(err)
    next({
      log: 'signup',
      message: {
        err: 'userController.signup ERROR: Check server logs for details',
      },
    });
  }
}

module.exports = userController;
