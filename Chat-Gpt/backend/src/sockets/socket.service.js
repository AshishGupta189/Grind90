const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const aiService = require("../services/ai.service");
const messageModel = require("../models/message.model");
const { createMemory , queryMemory } = require('../services/vector.service');
const { text } = require("express");

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    /* options */
  });

  io.on("connection", (socket) => {
    socket.on("message", async (data) => {
      const message=await messageModel.create({
        chat: data.chat,
        user: socket.user._id,
        content: data.content,
        role: "user",
      });
      
      const vector = await aiService.generateVector(data.content);
       //console.log(vector);
      
      const memory = await queryMemory({
        queryVector:vector,
        limit:5,
        metadata:{
          user: socket.user._id
        }
      });

      await createMemory({id:message._id,vector, metadata: {user: socket.user._id, chat: data.chat,text:message.content}});
 
      
      const chatHistory = (
        await messageModel
          .find({ chat: data.chat })
          .sort({ createdAt: -1 })
          .limit(5)
          .lean()
      ).reverse();

      const stm =chatHistory.map((msg) => {
          return {
            role: msg.role,
            parts: [{ text: msg.content }],
          };
      });

      const ltm = [
        {
          role:"user",
          parts:[{
            text :`These are some previous messages from the chat, use them to generate a response
            ${memory.map(item=>item.metadata.text).join("\n")}`
          }]
        }
      ]

      console.log([...ltm,...stm]);
      const response = await aiService.generateResponse([...ltm,...stm]);
      
      
      const responseMessage = await messageModel.create({
        chat: data.chat,
        user: socket.user._id,
        content: response,
        role: "model",
      });

      const responseVector = await aiService.generateVector(response);
      await createMemory({ id:responseMessage._id,vector:responseVector, metadata: {user: socket.user._id, chat: data.chat,text:responseMessage.content}});
      socket.emit("response", {
        chat: data.chat,
        content: response,
      });
    });
  });

  io.use(async (socket, next) => {
    // Middleware logic here
    const cookies = socket.handshake.headers.cookie;
    const parsedCookies = cookie.parse(cookies || "");
    if (!parsedCookies.token) {
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
