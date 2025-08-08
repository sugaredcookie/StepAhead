const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const OTP = require('../models/otpModel');

// Function to generate a JWT token
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

//login
exports.loginAdmin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }
  
    // 2) Check if user exists and password is correct
    const admin = await User.findOne({ email }).select('+password');
    if (!admin || !(await admin.correctPassword(password, admin.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }
  
    // 3) Check if it's actually the admin
    if (admin.role !== 'admin') {
        return next(new AppError('You are not authorized as admin', 403));
    }
  
    // 4) If everything is okay, send the token with admin's MongoDB _id
    const token = signToken(admin._id);
    res.status(200).json({
      status: 'success',
      token
    });
  });  

// Signup - Create a new user
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role || 'user'
    });

    const token = signToken(newUser._id);

    res.status(200).json({
        status: 'success',
        token,
        data: {
            user: newUser,
        },
    });
});

// Login - User login
// In your auth controller
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // Create token
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role // Make sure this is included
      }
    }
  });
});

// Forgot password - Send OTP to reset password
exports.forgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    const code = Math.floor(100000 + Math.random() * 900000);

    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError('There is no user with that email address', 404));
    }

    // Store OTP in the database
    await OTP.findOneAndUpdate(
        { email },
        { code, expiresAt: new Date(Date.now() + 5 * 60 * 1000) },
        { upsert: true, new: true }
    );

    const message = `
    Hello,

    We received a request to reset your password for your account associated with this email address: ${email}.
    
    Here is your one-time password (OTP) to reset your password:

    **OTP: ${code}**

    This code will expire in 5 minutes. Please use it to proceed with resetting your password on our platform.

    If you did not request a password reset, please disregard this email. For any concerns, feel free to contact our support team.

    Stay safe,
    StepAhead Team
    `;

    try {
        await sendEmail({
            to: email,
            subject: 'Password Reset OTP - StepAhead',
            text: message,
        });

        res.status(200).json({
            status: 'success',
            message: 'Reset code sent to your email!',
        });

        console.log(`OTP is: ${code}`);
    } catch (err) {
        return next(new AppError('There was an error sending the email. Try again later!', 500));
    }
});


// Verify OTP code for password reset
exports.verifyResetCode = catchAsync(async (req, res, next) => {
    const { email, code } = req.body;

    const record = await OTP.findOne({ email });

    if (!record) {
        return next(new AppError('No code found for this email', 400));
    }

    if (new Date() > record.expiresAt) {
        await OTP.deleteOne({ email });
        return next(new AppError('Code expired', 400));
    }

    if (parseInt(code) !== record.code) {
        return next(new AppError('Incorrect code', 400));
    }

    await OTP.deleteOne({ email });

    res.status(200).json({
        status: 'success',
        message: 'Code verified. You can now reset your password.',
    });
});

// Reset password after OTP verification
exports.resetPassword = catchAsync(async (req, res, next) => {
    const { email, password, passwordConfirm } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError('No user found with this email', 404));
    }

    user.password = password;
    user.passwordConfirm = passwordConfirm;
    await user.save();

    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token,
    });
});