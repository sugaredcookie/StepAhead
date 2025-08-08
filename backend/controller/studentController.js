const studentDetails = require('../models/studentDetails');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

// @desc    Get student for parent
// @route   GET /api/students/myChild
// @access  Parent
exports.getMyChild = catchAsync(async (req, res, next) => {
  // Get the logged-in user's email from the token
  console.log('Logged-in user email:', req.user.email);
  const parentEmail = req.user.email.toLowerCase();
  const student = await studentDetails.findOne({ 
  parentEmail: parentEmail 
});

  if (!student) {
    return next(new AppError('No child found for this parent email', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      student
    }
  });
});
// @desc    Get all students (admin only)
// @route   GET /api/students
// @access  Admin
exports.getAllStudents = catchAsync(async (req, res, next) => {
  const students = await studentDetails.find()
    .populate('createdBy', 'fullName email')
    .populate('parentId', 'fullName email phoneNumber');

  res.status(200).json({
    status: 'success',
    results: students.length,
    data: {
      students
    }
  });
});

// @desc    Create new student (admin only)
// @route   POST /api/students
// @access  Admin
exports.createStudent = catchAsync(async (req, res, next) => {
  const { parentId } = req.body;

  // 1. Verify parent exists
  const parent = await User.findById(parentId);
  if (!parent) {
    return next(new AppError('Parent user not found', 400));
  }

  // 2. Attach parentEmail from parent
  req.body.parentEmail = parent.email.trim().toLowerCase();

  // 3. Attach createdBy as the current admin
  req.body.createdBy = req.user._id;

  // 4. Create the student document
  const newStudent = await studentDetails.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      student: newStudent
    }
  });
});

// @desc    Get single student (admin only)
// @route   GET /api/students/:id
// @access  Admin
exports.getStudent = catchAsync(async (req, res, next) => {
  const student = await studentDetails.findById(req.params.id)
    .populate('createdBy', 'fullName email')
    .populate('updatedBy', 'fullName email')
    .populate('parentId', 'fullName email phoneNumber');

  if (!student) {
    return next(new AppError('No student found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      student
    }
  });
});

// @desc    Update student (admin only)
// @route   PATCH /api/students/:id
// @access  Admin
exports.updateStudent = catchAsync(async (req, res, next) => {
  // Add updatedBy field
  req.body.updatedBy = req.user._id;

  const student = await studentDetails.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).populate('parentId', 'fullName email phoneNumber');

  if (!student) {
    return next(new AppError('No student found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      student
    }
  });
});

// @desc    Delete student (admin only)
// @route   DELETE /api/students/:id
// @access  Admin
exports.deleteStudent = catchAsync(async (req, res, next) => {
  const student = await studentDetails.findByIdAndDelete(req.params.id);

  if (!student) {
    return next(new AppError('No student found with that ID', 404));
  }

  if (student.parentId) {
    await User.findByIdAndUpdate(student.parentId, {
            $pull: { children: student._id }
        });
    }


  res.status(204).json({
    status: 'success',
    data: null
  });
});