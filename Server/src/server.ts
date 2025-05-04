// Import the app
import app from './app'

// Database connection
const connectDB = require('./connect/db');

// Start the server after DB connection
connectDB().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000')
  })
});

