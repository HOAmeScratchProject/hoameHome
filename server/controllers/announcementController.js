const db = require('../models/hoameModels');

/*
  Manges CRUD of announcments to db
*/

const announcementController = {};

// function to retrieve all users from db
announcementController.getAllAnnouncements = async (req, res, next) => {
  try {
    const allAnnouncementsString =
      'SELECT * FROM announcements ORDER BY datetime DESC';
    const usersResult = await db.query(allAnnouncementsString);
    res.locals.announcements = usersResult.rows;
    return next();
  } catch (err) {
    // Using console.error vs console.log to specifically log an error object for handling errors.
    console.error(
      'Error in announcementController.getAllAnnouncements.js: ',
      err
    );

    return next({
      log:
        `Error in announcementController.getAllAnnouncements.js ERROR:` + err,
      status: 500, // Internal server error
      // Message users see.
      message: {
        err: 'An error occurred while retrieving announcements. Please try again later.',
      },
    });
  }
};
// function to create announcements
announcementController.createAnnouncements = async (req, res, next) => {
  const { title, message } = req.body;

  // check that a title and message exist
  if (!title || !message) {
    return next({
      log: 'Error in announcementController.createAnnouncements: ERROR: MISSING TITLE/MESSAGE',
      status: 400,
      message: {
        err: 'Title and message are required to create an announcement',
      },
    });
  }

  try {
    // query to create announcements
    const query =
      'INSERT INTO announcements (title,message, datetime) VALUES ($1, $2, NOW()) RETURNING *';
    const values = [title, message];
    const result = await db.query(query, values);
    res.locals.announcement = result.rows[0];

    return next();
  } catch (err) {
    return next({
      log: 'Error in announcementController.createAnnouncements: ERROR:',
      err,
      status: 400,
      message: {
        err: 'Title and message are required to create an announcement',
      },
    });
  }
};

// function to delete announcements by its ID
announcementController.deleteAnnouncement = async (req, res, next) => {
  const { id } = req.params;

  try {
    // sql query to delete by id
    const query = 'DELETE FROM announcements WHERE id = $1 RETURNING *;';
    const result = await db.query(query, [id]);

    // if no announcement to delete return 404
    if (result.rowCount === 0) {
      return next({
        log: 'Error in announcementController.deleteAnnouncements: ERROR: Announcement not found ',
        status: 404,
        message: { err: 'Announcement not found' },
      });
    }
    res.locals.deletedAnnouncement = result.rows[0];
    console.log(
      'res.locals.deletedAnnouncement',
      res.locals.deletedAnnouncement
    );
    return next();
  } catch (err) {
    return next({
      log: 'Error in announcementController.deleteAnnouncements: ERROR: ' + err,
      status: 500,
      message: { err: 'Error occurred while deleting announcement' },
    });
  }
};

module.exports = announcementController;
