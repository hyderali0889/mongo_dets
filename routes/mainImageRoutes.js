const express = require('express');
const router = express.Router();
const { postImg } = require('../controllers/ImageController');


router.route('/').post( postImg );

module.exports = router;