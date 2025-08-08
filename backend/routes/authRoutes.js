const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/verifyResetCode', authController.verifyResetCode); 
router.post('/resetPassword', authController.resetPassword);
router.post('/loginAdmin', authController.loginAdmin);

module.exports = router;