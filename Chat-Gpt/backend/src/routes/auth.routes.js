const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authMiddleware.authenticateToken, authController.logoutUser);
router.get('/me', authMiddleware.authenticateToken, authController.me);
module.exports = router;