const db = require('../models/hoameModels.js');

const sessionController = {};

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = async (req, res, next) => {
  //write code here
  try {
    const { id } = res.locals.account[0]; // get the id from newly created user
    console.log('Extracting id from res locals user', res.locals.account, id);

    // create new session with cookieId qual to ssid
    const newSessionString =
      'INSERT into sessions (user_id) VALUES ($1) RETURNING *';
    const session = await db.query(newSessionString, [id]);
    // console.log("SESSION CREATED", session.rows)
    res.locals.session = session.rows[0];
    return next();
  } catch (err) {
    // if error then pass to global error
    return next(`Error in sessionController.startSession" ${err}`);
  }
};

module.exports = sessionController;

// Stretch if time allows --> To support SSIDCookie, look to see if a session exists, if not create one.