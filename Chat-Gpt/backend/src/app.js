const express = require('express');
const cookieparser = require('cookie-parser');
const authRoutes = require('../src/routes/auth.routes');
const chatRoutes = require('../src/routes/chat.routes');
const cors = require('cors');
const app= express();
app.use(express.json());   
app.use(cookieparser());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
));

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

module.exports=app;