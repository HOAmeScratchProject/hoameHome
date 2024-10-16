const db = require('../models/hoameModels.js');

const sessionController = {};

/**
 * startSession - create and save a new Session into the database. with 1 hr time valid for
 */
sessionController.startSession = async (req, res, next) => {
  
  try {
    const { id } = res.locals.account[0]; // get the id from user in database
    console.log('Extracting id from res locals account', res.locals.account[0], id);
    // find session expiration for 1 hr
    const createdAT = new Date();
    const expirationTime = new Date(Date.now()+ 60 * 60 * 1000);

    // query to insert new session into sessions table
    const newSessionString = 'INSERT into sessions (user_id, created_time, expires_time) VALUES ($1, $2, $3) RETURNING *';
    const session = await db.query(newSessionString, [id, createdAT, expirationTime]);
    console.log("SESSION CREATED", session.rows)
    res.locals.session = session.rows[0];
    return next();
  } catch (err) {
    // if error then pass to global error
    return next({
      log: `Error in sessionController.startSession: ${err}`,
      status: 500,
      message: { err: 'An error occurred while creating the session.' },
    });
  }
};

/*
 * make sure user authenticated before access
 */
sessionController.isAuthenticated = async (req, res, next) => {
  try {
    // get session id from cookies and check for no ssid in cookies
    const { ssid } = req.cookies 
    if(!ssid) return res.status(401).json({message: "BEGONE, YOUR ACCESS HAS BEEN DENIED. NO ACTIVE SESSION FOUND"});
    
    // check session exist and if not expired
    const query = 'SELECT * FROM sessions WHERE user_id = $1';
    const result = await db.query(query, [ssid]); // do query
    if(result.rowCount === 0) return res.status(401).json({message: "BEGONE, YOUR ACCESS HAS BEEN DENIED. NO SESSION FOUND"});
  
    const currentTime = new Date (); // get current time
    const session = result.rows[0]; // get session details such as expires_time
    if(currentTime>session.expires_time) return res.status(401).json({ message: "BEGONE, YOUR ACCESS HAS BEEN DENIED. SESSION EXPIRED" });
  
    return next();
  } catch (error) {
    return next({
      log: `Error in sessionController.isAuthenticated: ${error}`,
      status: 500,
      message: { err: 'An error occurred while verifying the session.' },
    });
  }
}

/*
 * handle logout by deleting session from db and clearing session cookie
 */
sessionController.endSession = async (req, res, next) => {
  
  try {
     const { id } = req.cookies.ssid // ssid is stored in cookies

     // query to delete session based on user_id
     const deleteSession ='DELETE FROM sessions WHERE user_id = $1';
     await db.query(deleteSession, [id]);

     //clear cookie
     res.clearCookie('ssid');
     
     return next();
  } catch (error) {
    return next({
      log: `Error in sessionController.endSession : ${error}`,
      status: 500,
      message: { err: 'An error occurred while ending the session.' },
    });
  }
}
module.exports = sessionController;


