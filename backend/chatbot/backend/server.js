require("dotenv").config();
const app = require("./src/app")
const cors = require("cors");
app.use(cors());
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("./src/service/ai.service");
const { text } = require("stream/consumers");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // your frontend origin
    methods: ["GET", "POST"],
    credentials: true
  }
});
const chat= [];

io.on("connection", (socket) => {
  console.log("Connection established");
  socket.on("disconnect",()=>{
    console.log("Connection destablished!..");
  })

  socket.on("message",async(data)=>{   //custom event
    chat.push({
      role:"user",
      parts:[{text:data}]
    });
    const response = await generateResponse(chat);
    chat.push({
      role:"model",
      parts:[{text:response}]
    })
    socket.emit("ai-response",{response});
    console.log(chat);
    
  })
});


httpServer.listen(3000,()=>{
    console.log("Server is running on port 3000");
})