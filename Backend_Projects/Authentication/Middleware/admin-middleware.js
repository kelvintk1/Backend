const adminMiddleware = (req, res, next) => {
    console.log("adminMiddleware req.userInfo:", req.userInfo); // <-- Add this line
    if (!req.userInfo || req.userInfo.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: "Access denied. You do not have admin privileges."
        });
    }
    next();
};

module.exports = adminMiddleware;