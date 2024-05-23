const express = require('express');
const app = express();
const http = require('http').createServer(app);
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(express.static('Images'));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3001",
  methods: ["PUT", "POST", "GET", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  credentials: true
}));

// Routes
const studentRoutes = require('./routes/studentRoutes');
const staffRoutes = require('./routes/staffRoutes');
const adminRoutes = require('./routes/adminRoutes');
const login = require('./routes/adminRoutes');

app.use('/api', login);
app.use('/api/student', studentRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/admin', adminRoutes);

// Server configuration
const port = 3000;
const ip = 'localhost';

http.listen(port, ip, () => {
  console.log(`Server is listening to ${ip} on port ${port}`);
});

module.exports = app;
