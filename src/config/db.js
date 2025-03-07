// Import required packages
const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool for MySQL database
// This helps manage multiple connections efficiently
const pool = mysql.createPool({
    // Database connection settings from environment variables
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    
    // Pool configuration
    waitForConnections: true,  // Wait for available connection if none free
    connectionLimit: 10,       // Maximum number of connections to create
    queueLimit: 0             // Unlimited queue size
});

// Convert the regular pool to use promises instead of callbacks
// This allows us to use async/await syntax
const promisePool = pool.promise();

// Export the promise-based pool for use in other files
module.exports = promisePool; 