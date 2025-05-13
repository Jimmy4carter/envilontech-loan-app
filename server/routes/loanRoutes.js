const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const authController = require('../controllers/authController');

// Apply protect middleware to all routes
router.use(authController.protect); 

// GET /api/loans
router.get('/', loanController.getAllApplications);

// POST /api/loans
router.post('/', loanController.createApplication);

// GET /api/loans/:id
router.get('/:id', loanController.getApplication);

// PATCH /api/loans/:id
router.patch('/:id', loanController.updateApplication);

module.exports = router;