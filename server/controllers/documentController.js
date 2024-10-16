const db = require('../models/hoameModels');

const documentController = {};

/**
 * getAllDocs - retrieve all documents from Db storing in res.locals before next'ing to next middleware.
 */

documentController.getAllDocs = async (req, res, next) => {
  try {
    const getDocsString = 'SELECT * FROM files';
    const docsResult = await db.query(getDocsString);
    // if no documents return 404.  Check against rowCount property in the docsResult object returned from db.query()
    if (docsResult.rowCount === 0) {
      return next({
        log: 'Error in documentController.getAllDocs: ERROR: No documents found in DB.',
        status: 404, // Not found
        message: { err: 'No documents found.  Please upload a document' },
      });
    }
    // console.log('docsResult in documentController.js= ', docsResult);
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
      message: {
        err: 'An error occurred while retrieving documents. Please try again later.',
      },
    });
  }
};

// handles uploaded file & saves it to database:
documentController.postUpload = async (req, res, next) => {
  try {
    //destrucure properties of req.file object provided by upload/multer() middleware in api.js route
    const { originalname, mimetype, size, buffer } = req.file;
    console.log(
      'documentController.postUpload - Uploaded file: ',
      originalname,
      mimetype,
      size
    );
    //DB Query.  content_type means MIME type means .pdf, .doc, .rtf, etc.
    const queryText =
      'INSERT INTO files (filename, file_size, content_type, upload_time, file_data) VALUES ($1, $2, $3, NOW(), $4)';
    // properties from multer's req.file
    const values = [originalname, size, mimetype, buffer];
    await db.query(queryText, values);
    //set response (res.locals) to send back successful response
    res.locals.upload = {
      message: 'File uploaded successfully',
      filename: originalname,
    };
    return next();
  } catch (err) {
    console.error('Error in documentController.postUpload: ', err);
    return next({
      log: 'Error in documentController.postUpload: ' + err,
      status: 500,
      message: {
        err: 'An error occurred while uploading the document. Please try again later.',
      },
    });
  }
};

documentController.deleteDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    //destrucure properties of req.file object provided by upload/multer() middleware in api.js route
    // const { originalname, mimetype, size, buffer } = req.file;
    // console.log(
    //   'documentController.postUpload - Uploaded file: ',
    //   originalname,
    //   mimetype,
    //   size
    // );
    //DB Query.  content_type means MIME type means .pdf, .doc, .rtf, etc.
    const queryText = 'DELETE FROM files WHERE id = $1 RETURNING *;';
    const result = await db.query(queryText, [id]);

    if (result.rowCount === 0) {
      next({
        log: 'Error in documentController.deleteDocument: ERROR: document not found',
        status: 404,
        message: { err: 'Document not found' },
      });
    }
    //set response (res.locals) to send back successful response
    res.locals.deletedDoc = result.rows[0];
    return next();
  } catch (err) {
    console.error('Error in documentController.deleteDocument: ', err);
    return next({
      log: 'Error in documentController.deleteDocument: ' + err,
      status: 500,
      message: {
        err: 'An error occurred while deleting the document. Please try again later.',
      },
    });
  }
};

module.exports = documentController;
