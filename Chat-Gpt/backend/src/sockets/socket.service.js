const { Server } = require("socket.io");
const cookie = require('cookie');
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model');
const aiService = require('../services/ai.service');
const messageModel = require('../models/message.model');

function initSocketServer(httpServer){
    const io = new Server(httpServer, { /* options */ });

    io.on("connection", (socket) => {
      socket.on("message", async(data) => {
        await messageModel.create({
          chat: data.chat,
          user: socket.user._id,
          content: data.content,
          role: 'user'
        })
        const chatHistory = (await messageModel.find({ chat: data.chat }).sort({ createdAt: -1 }).limit(5).lean()).reverse();
        const response= await aiService.generateResponse(chatHistory.map((msg)=>{
          return {
            role:msg.role,
            parts:[{text:msg.content}]
          }
        }));
        await messageModel.create({
          chat: data.chat,
          user: socket.user._id,
          content: response,
          role: 'model'
        })
        socket.emit("response", {
          chat: data.chat,
          content: response
        });
      });
    });

    io.use(async(socket, next) => {
        // Middleware logic here
        const cookies=socket.handshake.headers.cookie;
        const parsedCookies = cookie.parse(cookies || "");
        if(!parsedCookies.token){
          return next(new Error("Authentication error"));
        }

        const decoded = jwt.verify(parsedCookies.token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        socket.user = user;
        next();
    });

    io.on("disconnect", (socket) => {
        console.log("Socket disconnected:", socket.id);
    });
}


module.exports = initSocketServer;