const express = require('express');
const userController = require('../controllers/userController');
const documentController = require('../controllers/documentController');
const announcementController = require('../controllers/announcementController')
//require multer for /upload endpoint
const multer = require('multer');
const upload = multer();

const router = express.Router();

// route to get all users
router.get('/users', userController.getAllUsers, (req, res) => {
 res.status(200).json(res.locals.users);
});
// route to create user
router.post('/signup', userController.signup, (req,res)=>{
})
// route to get all announcements
router.get('/announcements', announcementController.getAllAnnouncements, (req, res) =>{
 res.status(200).json(res.locals.announcements);
})
// route to create announcement
router.post('/announcements', announcementController.createAnnouncements, (req, res) =>{
 res.status(201).json(res.locals.announcements);
})
// route to delete announcement
// router.delete('/announcements', announcementController.deleteAnnouncements, (req, res) =>{
//   // console.log('Made it to response in api.js', res.locals.announcements )
//  res.status(200).json(res.locals.deletedAnnouncement);
// })

/**
 * documentController routes
 * upload endpoint for calling multer upload.single('file') <-- argument must match name attribute set in HTML form that submits the file <--, followed by documentControllerUpload middleware to upload files to Db & then send a response back.
 */ 
router.post('/upload', upload.single('file'), documentController.postUpload, (req, res) =>{
  console.log('from api.js - File uploaded and saved to database.');
  res.status(201).json(res.locals.upload);
})

// Route to get documents from DB
router.get('/getDocs', documentController.getAllDocs, (req, res) => {
    console.log('Hello from /viewDocs route in api.js"');
    return res.status(200).json(res.locals.docs)
  })
  
  module.exports = router;
  
  // Commenting out for now, using announcementController.createAnnouncements instead.
  // router.post('/announcements', 
  //   announcementController.postAnnouncement, 
  //   announcementController.getAllAnnouncements, 
  //   (req, res) =>{
  //   // console.log('Made it to response in api.js', res.locals.announcements )
  //  res.status(201).json(res.locals.announcements);
  // })
