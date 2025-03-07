// 1. Import Express and other dependencies
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const schoolRoutes = require('./src/routes/schoolRoutes');

// 2. Create Express application
const app = express();

// 3. Middleware Setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Routes
app.use('/api', schoolRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'School Management API is running' });
});

// 5. Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 6. Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
