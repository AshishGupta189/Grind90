const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const aiService = require("../services/ai.service");
const messageModel = require("../models/message.model");
const { createMemory, queryMemory } = require("../services/vector.service");
const { text } = require("express");

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    /* options */
  });

  io.on("connection", (socket) => {
    socket.on("message", async (data) => {
      // sara task ek sath execute krega, jisko sbse jyada tym lgege vhi overall time hoga
      const [message, vector] = await Promise.all([
        messageModel.create({
          chat: data.chat,
          user: socket.user._id,
          content: data.content,
          role: "user",
        }),

        aiService.generateVector(data.content)
        
      ]);

        const [memory, chatHistory] = await Promise.all([
          queryMemory({
            queryVector: vector,
            limit: 5,
            metadata: {
              user: socket.user._id,
            },
          }),
          (messageModel
            .find({ chat: data.chat })
            .sort({ createdAt: -1 })
            .limit(5)
            .lean()).then(res => res.reverse()),
        ]);

      createMemory({
          id: message._id,
          vector,
          metadata: {
            user: socket.user._id,
            chat: data.chat,
            text: message.content,
          },
        });

      const stm = chatHistory.map((msg) => {
        return {
          role: msg.role,
          parts: [{ text: msg.content }],
        };
      });

      const ltm = [
        {
          role: "user",
          parts: [
            {
              text: `These are some previous messages from the chat, use them to generate a response
            ${memory.map((item) => item.metadata.text).join("\n")}`,
            },
          ],
        },
      ];

      const response = await aiService.generateResponse([...ltm, ...stm]);

      
      socket.emit("response", {
        chat: data.chat,
        content: response,
      });

      const [responseMessage, responseVector] = await Promise.all([
        messageModel.create({
          chat: data.chat,
          user: socket.user._id,
          content: response,
          role: "model",
        }),
        aiService.generateVector(response),
      ]);

      await createMemory({
        id: responseMessage._id,
        vector: responseVector,
        metadata: {
          user: socket.user._id,
          chat: data.chat,
          text: responseMessage.content,
        },
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
