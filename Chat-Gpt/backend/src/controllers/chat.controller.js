const chatModel = require('../models/chat.model');
const messageModel = require('../models/message.model');

/**
 * CREATE NEW CHAT
 */
async function createChat(req, res, next) {
  const { title } = req.body;
  const user = req.user;

  try {
    const newChat = await chatModel.create({
      user: user._id,
      title
    });

    res.status(201).json({
      message: "Chat created successfully",
      chat: newChat
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET ALL CHATS (SIDEBAR)
 */
async function getChats(req, res, next) {
  try {
    const chats = await chatModel
      .find({ user: req.user._id })
      .sort({ updatedAt: -1 })
      .select("_id title createdAt updatedAt");

    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
}

/**
 * GET CHAT MESSAGES (CHAT WINDOW)
 */
async function getChatMessages(req, res, next) {
  const { chatId } = req.params;

  try {
    // check chat belongs to user
    const chat = await chatModel.findOne({
      _id: chatId,
      user: req.user._id
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const messages = await messageModel
      .find({ chat: chatId })
      .sort({ createdAt: 1 }) // oldest → newest
      .select("_id content role createdAt");

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createChat,
  getChats,
  getChatMessages
};
