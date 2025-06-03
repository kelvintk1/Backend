const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("Authorization header:", authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Token received:", token);
    console.log("JWT_SECRET:", process.env.JWT_SECRET_KEY);
    if(!token){
        return res.status(401).json({ success: false, message: 'Access denied. No token provided! PLease login to continue' });
    }
 
    try { 
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded user from token:", user);
        req.userInfo = user;
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(403).json({ success: false, message: 'Invalid token. Access denied!' });
    }
};

module.exports = authMiddleware;