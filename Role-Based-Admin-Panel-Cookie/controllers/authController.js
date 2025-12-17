const User = require('../models/Users');

const bcrypt = require('bcrypt');

exports.showLogin = (req, res) => {
    res.render('login');
}

exports.doLogin = async (req, res) => {

    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.send("User not Found..");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.send("Wrong Password..");
    }

    res.cookie("authToken", user._id.toString(), {
        httpOnly : true,
        signed : true,
        maxAge : 1000 * 60 * 60
    });

    if(user.role === "admin"){
        res.redirect("/admin/adminDashboard");
    }
    else{
        res.redirect("/users/userDashboard");
    }
}

exports.showSignUp = (req, res) => {
    res.render('signup');
}

exports.doSignUp = async (req, res) => {

    const {name, email, password, role} = req.body;

    const hashPassword = await bcrypt.hash(password,10);

    await User.create({
        name,
        email,
        password : hashPassword,
        role
    });
    res.send("User Registration Successfully");
    res.redirect('login');
}

exports.adminDashboard = (req, res) => {
    res.render('adminDashboard');
}

exports.userDashboard = (req, res) => {
    res.render('userDashboard');
}

exports.logout = (req, res) => {
    res.clearCookie("authToken");
    res.redirect('/login');
}