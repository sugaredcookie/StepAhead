const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  childName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },

  motherName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },

  contactNumber: {
    type: String,
    required: true,
  },
  alternateContactNumber: {
    type: String,
    default: '',
  },

  email: String,
  address: String,
  message: String,

  submittedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Admission', admissionSchema);