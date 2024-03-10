const userModel = require('../models/userModel');
const emailValidator = require('email-validator'); 

exports.signupValidate = async (req, res, next) => {
    const {name, email, password} = req.body;

    // check for missing info
    if(!(name && email && password)) {
        return res.status(400).json({
            success: false,
            message: 'All the fields are required'
        })
    }

    // validate name
    if(name.length < 3) {
        return res.status(400).json({
            success: false,
            message: 'Name must be atleast 3 characters long'
        })
    }

    // validate email
    if(!(emailValidator.validate(email))) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email address'
        })
    }

    // check if user has already signup with the same email
    const existingUser = await userModel.findOne({email});
    if(existingUser) {
        return res.status(400).json({
            success: false,
            message: 'User already exists'
        })
    }

    // validate password
    if(password.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'Password must be atleast 6 characters long'
        })
    }
    if(password.length > 12) {
        return res.status(400).json({
            success: false,
            message: 'Password must be atmost 12 characters long'
        })
    }

    next();
}