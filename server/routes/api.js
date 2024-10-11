const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/users', userController.getAllUsers, (req, res) => {
  console.log('users is working');
  res.status(200).json(res.locals.users);
});

module.exports = router;
