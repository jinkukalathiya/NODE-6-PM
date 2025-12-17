const express = require('express');

const passport = require('passport');

const isAuthenticated = require('../middlewares/authMiddleware');

const User = require('../models/User');

const route = express.Router();

route.get("/login", (req, res) => {
    res.render('login');
})

route.post("/login", 
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/login"
    })
)

route.get("/dashboard",isAuthenticated, (req, res) => {
    res.render("dashboard", {user : req.user});
})

route.get("/logout", (req, res, next) => {
    req.logout(function(err){
        if(err){
            return next(err);
        }
        res.redirect("/login");
    })
})

module.exports = route;