const express = require('express');
const studentRoutes = require('./routes/student.routes');
const classRoutes = require('./routes/class.routes');
const teacherRoutes = require('./routes/teacher.routes');   
const cors = require('cors');


const app = express();
app.use(express.json());
// Enable CORS for all routes
app.use(cors());
app.use('/api', studentRoutes);
app.use('/api', classRoutes);
app.use('/api', teacherRoutes);

module.exports = app;