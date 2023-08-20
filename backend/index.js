const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const averageRoutes = require('./routes/averageRoutes');
const quotesRoutes = require('./routes/quotesRoutes');
const slippageRoutes = require('./routes/slippageRoutes');
const bodyParser = require('body-parser');
const User = require('./models/userModel');
require('./mongodbConnect'); // Import and execute the MongoDB connection code



const { setupWebSocketServer } = require('./utils/websocket'); // Import WebSocket setup function

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Express configuration
app.use(bodyParser.json());
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./config/passport');

// Set up WebSocket server
const wss = setupWebSocketServer(server); // Create WebSocket server

// Middleware
app.use('/auth', authRoutes);
app.use( averageRoutes);
app.use('/quotes', quotesRoutes);
app.use(slippageRoutes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
