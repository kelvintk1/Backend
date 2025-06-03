const express = require('express');
const router = express.Router();
const { registerUser, loginUser, changePassword } = require('../Controllers/Auth-ctrl');
const authMiddleware  = require('../Middleware/Auth-middleware');
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-password', authMiddleware, changePassword);

module.exports = router;