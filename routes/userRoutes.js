const express = require('express');
const router= express.Router();
const {getAllUsers , registerUser} = require('../controllers/userController');

router.route('/').get(getAllUsers).post(registerUser);

module.exports = router;