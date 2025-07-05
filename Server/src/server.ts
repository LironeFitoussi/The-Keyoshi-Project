// Import the app
import app from './app'

// Database connection
const connectDB = require('./connect/db');

// Get port from environment variable or use 3000 as fallback
const PORT = process.env.PORT || 3000;

// Start the server after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
});

