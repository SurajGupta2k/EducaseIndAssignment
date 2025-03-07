const db = require('../config/db');
const { schoolSchema } = require('../utils/validation');

// Calculates the distance between two points on Earth using their coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};

// Adds a new school to the database
const addSchool = async (req, res) => {
    try {
        // Make sure the school data is valid
        const { error, value } = schoolSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Check if we can connect to the database
        try {
            await db.execute('SELECT 1');
        } catch (dbError) {
            console.error('Database connection error:', dbError);
            return res.status(500).json({ 
                error: 'Database connection failed',
                details: process.env.NODE_ENV === 'development' ? dbError.message : undefined
            });
        }

        // Save the school in the database
        const [result] = await db.execute(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [value.name, value.address, value.latitude, value.longitude]
        );

        res.status(201).json({
            message: 'School added successfully',
            schoolId: result.insertId
        });
    } catch (err) {
        console.error('Error adding school:', err);
        res.status(500).json({ 
            error: 'Failed to add school',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// Gets all schools and sorts them by distance from given coordinates
const listSchools = async (req, res) => {
    try {
        // Make sure we have coordinates to work with
        const { latitude, longitude } = req.query;
        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Latitude and longitude are required' });
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        // Make sure the coordinates are valid
        if (isNaN(userLat) || isNaN(userLon) || 
            userLat < -90 || userLat > 90 || 
            userLon < -180 || userLon > 180) {
            return res.status(400).json({ error: 'Invalid coordinates' });
        }

        // Get all schools from database
        const [schools] = await db.query('SELECT * FROM schools');

        // Figure out how far each school is from the given location
        const schoolsWithDistance = schools.map(school => ({
            ...school,
            distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
        }));

        // Put closest schools first
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(schoolsWithDistance);
    } catch (err) {
        console.error('Error listing schools:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Removes a school from the database
const deleteSchool = async (req, res) => {
    try {
        const { id } = req.params;

        // Make sure we have a school ID
        if (!id) {
            return res.status(400).json({ error: 'School ID is required' });
        }

        // Make sure the school exists before trying to delete it
        const [school] = await db.execute('SELECT * FROM schools WHERE id = ?', [id]);
        
        if (school.length === 0) {
            return res.status(404).json({ error: 'School not found' });
        }

        // Remove the school from database
        await db.execute('DELETE FROM schools WHERE id = ?', [id]);

        res.json({ message: 'School deleted successfully' });
    } catch (err) {
        console.error('Error deleting school:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addSchool,
    listSchools,
    deleteSchool
}; 