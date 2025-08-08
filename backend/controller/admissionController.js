const Admission = require('../models/admissionModel');
const catchAsync = require('../utils/catchAsync');

exports.submitAdmission = catchAsync(async (req, res) => {
    try {
      const {
        childName,
        dateOfBirth,
        motherName,
        fatherName,
        contactNumber,
        alternateContactNumber,
        email,
        address,
        message,
      } = req.body;
  
      const newAdmission = new Admission({
        childName,
        dateOfBirth,
        motherName,
        fatherName,
        contactNumber,
        alternateContactNumber,
        email,
        address,
        message,
      });
  
      await newAdmission.save();
      res.status(201).json({ message: 'Admission submitted successfully!' });
    } catch (error) {
      console.error('Admission submission failed:', error);
      res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
  });  