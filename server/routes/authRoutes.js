const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Auth route is working!' });
});

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;