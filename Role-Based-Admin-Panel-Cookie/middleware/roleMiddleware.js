const User = require('../models/Users');

module.exports.isAdmin = async (req, res, next) => {
    const userId = req.signedCookies.authToken;

    const user = await User.findById(userId);

    if( User && user.role === "admin"){
        next();
    }
    else{
        res.send("Access Denied.. This is for Admin Only.....!");
    }
}

module.exports.isUser = async (req, res, next) => {
    const userId = req.signedCookies.authToken;

    const user = await User.findById(userId);

    if( User && user.role === "user"){
        next();
    }
    else{
        res.send("Access Denied.. This is for Users Only.....!");
    }
}