const express = require('express');
const studentController = require('../controller/studentController');
const auth = require('../middleware/auth');

const router = express.Router();

// Protect all routes after this middleware
router.use(auth.protect);

// Parent access routes
router.get('/myChild', auth.restrictTo('user'), studentController.getMyChild);

// Admin access routes
router.route('/')
  .get(auth.restrictTo('admin'), studentController.getAllStudents)
  .post(auth.restrictTo('admin'), studentController.createStudent);

router.route('/:id')
  .get(auth.restrictTo('admin'), studentController.getStudent)
  .post(auth.restrictTo('admin'), studentController.updateStudent)
  .delete(auth.restrictTo('admin'), studentController.deleteStudent);

module.exports = router;