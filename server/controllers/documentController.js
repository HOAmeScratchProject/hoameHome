const db = require('../models/hoameModels');

const documentController = {};

/**
 * getAllDocs - retrieve all documents from Db storing in res.locals before next'ing to next middleware.
 */

documentController.getAllDocs = async (req, res, next) => {
  try {
    const getDocsString = 'SELECT * FROM files';
    const docsResult = await db.query(getDocsString);
    console.log('docsResult in documentController.js= ', docsResult);
    const docs = docsResult.rows;
    res.locals.docs = docs;
    return next();
  } catch (err) {
    // Using console.error vs console.log to specifically log an error object for handling errors.
    console.error('Error in documentController.getAllDocs.js: ', err);
    return next({
      log: `Error in documentController.getAllDocs ERROR:` + err,
      status: 500, // Internal server error
      // Message users see.
      message: { err: 'An error occurred while retrieving documents. Please try again later.'},
    });
  }
};
