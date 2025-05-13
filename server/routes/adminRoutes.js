const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

// Protect all routes
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.get('/stats', adminController.getDashboardStats);
router.get('/users', adminController.getAllUsers);

module.exports = router;