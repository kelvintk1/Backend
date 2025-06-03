const express = require('express');
const authMiddleware = require('../Middleware/Auth-middleware');
const router = express.Router();

router.get('/welcome', authMiddleware, (req, res) => {
    const {username, userId, role} = req.userInfo || {};
    res.status(200).json({
        success: true,
        message: 'Welcome to the home page!',
        user: { username, userId, role }
    });
});

module.exports = router;