
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register controller
const registerUser = async (req, res) => {
    try {
        // Validate input
        const { username, email, password, role } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide username, email, and password"
            });
        }

        console.log("registering:", { username, email });

        // check if the user already exist in the database
        const checkExistingUser = await User.findOne({
            $or: [{ username: username }, { email: email }]
        });

        if (checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this username or email already exist. Please try again with a unique username or email",
            });
        }

        // hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create a new user and save in your database
        const newlyCreatedUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || "user" // default role is user
        });

        await newlyCreatedUser.save();
        if (newlyCreatedUser) {
            return res.status(201).json({
                success: true,
                message: "User registered successfully",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Failed to register user. Please try again",
            });
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred! Please try again",
        });
    }
}

// login controller (fixed)

const loginUser = async (req, res) => {
    try {
        console.log("Login request body:", req.body);

        const { identifier, password } = req.body;
        if (!identifier || !password) {
            console.log("Missing identifier or password");
            return res.status(400).json({
                success: false,
                message: "Please provide your username or email and password"
            });
        }

        const user = await User.findOne({
            $or: [{ username: identifier }, { email: identifier }]
        });
        console.log("User found:", user);

        if (!user) {
            console.log("User not found");
            return res.status(401).json({
                success: false,
                message: "Invalid username/email or password"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isPasswordMatch);

        if (!isPasswordMatch) {
            console.log("Password does not match");
            return res.status(401).json({
                success: false,
                message: "Invalid username/email or password"
            });
        }

        console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);
        const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET_KEY, // <--- must match!
        { expiresIn: "15m" }
        );
        console.log("JWT token generated");
        
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username
            },
            accessToken: token
        });
    } catch (e) {
        console.error("Login error:", e);
        res.status(500).json({
            success: false,
            message: "Some error occurred! Please try again",
        });
    }
};

const changePassword = async(req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide your old password and new password"
            });
        }

        const user = await User.findById(req.userInfo.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isOldPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect"
            });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        
        // update user password
        user.password = newPassword
        await user.save();
        console.log("Password changed successfully for user:", user.username);

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (e) {
        console.error("Change password error:", e);
        res.status(500).json({
            success: false,
            message: "Some error occurred! Please try again",
        });
    }
};


module.exports = { registerUser, loginUser, changePassword }
