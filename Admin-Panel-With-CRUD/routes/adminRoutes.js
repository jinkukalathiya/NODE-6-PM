const express = require('express');

const route = express.Router();

console.log("Routing..");

const adminCtl = require('../controllers/adminController');

const Admin = require('../models/Admin');

const passport = require('passport');

route.get('/', adminCtl.login);

route.post('/checkLogin', passport.authenticate('local',{failureRedirect : '/'}) ,adminCtl.checkLogin);

route.get('/signout', adminCtl.signout);

route.get('/changePassword',passport.checkAuthentication, adminCtl.changePassword);

route.post('/checkChangePassword',passport.checkAuthentication, adminCtl.checkChangePassword);

route.get('/profile',passport.checkAuthentication, adminCtl.profile);

route.get('/verifyEmail', adminCtl.verifyEmail);

route.post('/checkEmail', adminCtl.checkEmail);

route.get('/otpPage', adminCtl.otpPage);

route.post('/verifyOTP', adminCtl.verifyOTP);

route.get('/newPassword', adminCtl.newPassword);

route.post('/forgotPassword', adminCtl.forgotPassword);

route.get('/dashboard',passport.checkAuthentication ,adminCtl.dashboard);

route.get('/add-admin',passport.checkAuthentication, adminCtl.addAdmin);

route.post('/insertAdminData',passport.checkAuthentication,Admin.uploadAdminImages,adminCtl.insertAdminData);

route.get('/view-admin',passport.checkAuthentication, adminCtl.viewAdmin);

route.get('/deleteAdmin/:_id',passport.checkAuthentication, adminCtl.deleteAdmin);

route.get('/updateAdmin/',passport.checkAuthentication, adminCtl.updateAdmin);

route.post('/editAdminData/:id',passport.checkAuthentication,Admin.uploadAdminImages,adminCtl.editAdminData);

module.exports = route;