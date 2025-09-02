const chatModel = require('../models/chat.model');


async function createChat(req, res,next) {
    const {title} = req.body;
    const user = req.user;

    try {
        const newChat = await chatModel.create({  user:user._id, title });
        res.status(201).json({
            message:"Chat created successfully",
            chat:newChat
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createChat
};