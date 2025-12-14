const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const chatController = require('../controllers/chat.controller');
const router = express.Router();

router.post('/', authMiddleware.authenticateToken, chatController.createChat);
router.get('/', authMiddleware.authenticateToken, chatController.getChats);
router.get('/:chatId', authMiddleware.authenticateToken, chatController.getChatMessages);

module.exports = router;