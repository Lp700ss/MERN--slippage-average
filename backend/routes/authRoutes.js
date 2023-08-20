// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/google', authController.authGoogle);
router.get('/google/callback', authController.authGoogleCallback);

module.exports = router;
