require('dotenv').config();
const app = require('./src/app');
const initSocketServer = require('./src/sockets/socket.service');
const httpServer = require('http').createServer(app);


const connectDb = require('./src/db/db');

connectDb();
initSocketServer(httpServer);

httpServer.listen(3000, () => {
  console.log('Server is running on port 3000');
});