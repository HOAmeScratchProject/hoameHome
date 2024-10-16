const db = require("../models/hoameModels");

const announcementController = {};

/**
 * getAllUsers - retrieve all users from the database and stores it into res.locals
 * before moving on to next middleware.
 */
announcementController.getAllAnnouncements = async (req, res, next) => {
  try {
    const allAnnouncementsString =
      "SELECT * FROM announcements ORDER BY datetime DESC";
    const usersResult = await db.query(allAnnouncementsString);
    // res.locals.announcements = usersResult.rows;
    // return next();
    // if no announcements exist send 404
    // if(usersResult.rowCount === 0) return res.status(404).json({message: 'No annoucements found'});

    // If no announcements exist, return an empty array
    if (usersResult.rowCount === 0) return res.status(200).json([]);

    // send annoucenemnts as response
    return res.status(200).json(usersResult.rows);
  } catch (err) {
    // Using console.error vs console.log to specifically log an error object for handling errors.
    console.error(
      "Error in announcementController.getAllAnnouncements.js: ",
      err
    );
    return next({
      log:
        `Error in announcementController.getAllAnnouncements.js ERROR:` + err,
      status: 500, // Internal server error
      // Message users see.
      message: {
        err: "An error occurred while retrieving announcements. Please try again later.",
      },
    });
  }
};
// create Announcements
announcementController.createAnnouncements = async (req, res, next) => {
  const { title, message } = req.body;
  //const createAnnouncementString = ''
  // const createAnnouncement = await db.query(createAnnouncement)

  // check that a title and message exist
  if (!title || !message) {
    return next({
      log: "Error in announcementController.createAnnouncements: ERROR: MISSING TITLE/MESSAGE",
      status: 400,
      message: {
        err: "Title and message are required to create an announcement",
      },
    });
  }

  try {
    // query to create announcements
    const query =
      "INSERT INTO announcements (title,message, datetime) VALUES ($1, $2, NOW()) RETURNING *";
    const values = [title, message];

    // do query
    const result = await db.query(query, values);
    // store query
    // res.locals.announcement = result.rows[0];

    // Send the new announcement as the response
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error in announcementController.createAnnouncements:", err);
    return next({
      log: `Error in announcementController.createAnnouncements: ${err}`,
      status: 500,
      message: {
        err: "An error occurred while creating the announcement. Please try again later.",
      },
    });
  }
};

//posting an announcement to the database  // Commenting out keeping createAnnouncment for now.
// announcementController.postAnnouncement = async (req, res, next) => {
//   //capture the current date and time to post to database under formatted_date
//   const now = new Date();
//   const formattedDate = now.toLocaleString();
//   console.log(formattedDate)

//   //capture the title and message from the request body
//   const { message, title } = req.body

//   //post the new message to the database
//   try {
//     const insertMessageString = 'INSERT into announcements (title, message, formatted_date) VALUES($1, $2, $3)';
//     const postMessage = await db.query(insertMessageString, [title, message, formattedDate]);
//     console.log("created a new message!", postMessage)
//     // res.locals.announcements = usersResult.rows;
//     return next();
//   } catch (err) {
//     // Using console.error vs console.log to specifically log an error object for handling errors.
//     console.error('Error in announcementController.postAnnouncement.js: ', err);
//     return next({
//       log: `Error in announcementController.postAnnouncement.js ERROR:` + err,
//       status: 500, // Internal server error
//       // Message users see.
//       message: { err: 'An error occurred while retrieving announcements. Please try again later.'},
//     });
//   }
// }

// delete Announcements
announcementController.deleteAnnouncement = async (req, res, next) => {
  const { id } = req.params;

  try {
    // sql query to delete by id
    const query = "DELETE FROM announcements WHERE id = $1 RETURNING *;";
    // do query
    const result = await db.query(query, [id]);

    // if no announcement to delete return 404
    // if (result.rowCount === 0) {
    //   return next ({
    //     log: 'Error in announcementController.deleteAnnouncements: ERROR: Announcement not found ',
    //     status: 404,
    //     message : { err : 'Announcement not found'},
    //     });
    // }

    // If no announcement was deleted, return a 404 error
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    // Return the deleted announcement
    return res.status(200).json(result.rows[0]);

    // store query
    // res.locals.deletedAnnouncement = result.rows[0];
    // return next();
  } catch (err) {
    // return next ({
    //   log: 'Error in announcementController.deleteAnnouncements: ERROR: ' + err,
    //   status: 500,
    //   message : { err : 'Error occurred while deleting announcement'},
    //   });

    return res.status(500).json({
      error:
        "An error occurred while deleting the announcement. Please try again.",
    });
  }
};

module.exports = announcementController;
