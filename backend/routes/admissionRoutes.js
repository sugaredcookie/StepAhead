const express = require('express');
const router = express.Router();
const { submitAdmission } = require('../controller/admissionController');

// POST /api/admissions
router.post('/', submitAdmission);

module.exports = router;