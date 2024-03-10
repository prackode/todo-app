const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const todoModel = require('../models/todoModel.js');

// signup
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);
        // save the user
        const userInfo = userModel({
            name,
            email,
            password: hashedPassword
        });
        await userInfo.save();

        // Generate JWT token
        const token = jwt.sign({ userId: userInfo._id }, process.env.SECRET, {
            expiresIn: '12h'
        });

        // Set the JWT token as a cookie
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });

        // Send the status and success message
        return res.status(200).json({
            success: true,
            message: 'User signup successful',
            token: token
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    try {

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
            expiresIn: '12h'
        });

        // Set the JWT token as a cookie
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });

        // Send the status and success message
        return res.status(200).json({
            success: true,
            message: 'User login successfulyl',
            token: token
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Logout
exports.logout = async (req, res) => {
    // Clear the JWT token cookie
    res.clearCookie('token');

    // Send the status and success message
    return res.status(200).json({
        success: true,
        message: 'User logout successfully'
    });
};


// get user
exports.getUser = async (req, res) => {
    const { userId } = req.user;

    try {
        // find the user by ID
        const user = await userModel.findById(userId);

        // check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // send the user information
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// update user
exports.userUpdate = async (req, res) => {
    const { name, email } = req.body;
    const userId = req.user.userId; // retrieved from the JWT token

    try {
        // update the user
        await userModel.findByIdAndUpdate(userId, { name, email });

        // send the status and success message
        return res.status(200).json({
            success: true,
            message: 'User updated successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// delete user
exports.userDelete = async (req, res) => {
    const userId = req.user.userId; // retrieved from the JWT token

    try {
        // Delete the user and their associated todos
        await userModel.findByIdAndDelete(userId);
        await todoModel.deleteMany({ userId });

        // Clear the cookies
        res.clearCookie("token");

        // Send the status and success message
        return res.status(200).json({
            success: true,
            message: "User and associated todo data deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};