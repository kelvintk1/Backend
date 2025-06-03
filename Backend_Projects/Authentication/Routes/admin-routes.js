const express = require('express');
const router = express.Router();
const authMiddleware = require("../Middleware/Auth-middleware");
const adminMiddleware = require('../Middleware/admin-middleware'); // Fixed naming

router.get('/welcome', authMiddleware, adminMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the admin page'
    });
});

module.exports = router;