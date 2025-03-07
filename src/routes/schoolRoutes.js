const express = require('express');
const router = express.Router();
const { addSchool, listSchools, deleteSchool } = require('../controllers/schoolController');

router.post('/addSchool', addSchool);
router.get('/listSchools', listSchools);
router.delete('/deleteSchool/:id', deleteSchool);

module.exports = router; 