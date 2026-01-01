const express = require('express');

const route = express.Router();

console.log("Routing..");

const adminCtl = require('../controllers/adminController');

const Admin = require('../models/Admin');

const authMid = require('../middlewares/authMiddleware');

route.get('/', adminCtl.login);

route.post('/checkLogin', adminCtl.checkLogin);

route.get('/signout', adminCtl.signout);

route.get('/changePassword', adminCtl.changePassword);

route.post('/checkChangePassword', adminCtl.checkChangePassword);

route.get('/profile', adminCtl.profile);

// route.get('/forgotPassword', adminCtl.forgotPassword);

route.get('/dashboard', adminCtl.dashboard);

route.get('/add-admin', adminCtl.addAdmin);

route.post('/insertAdminData',Admin.uploadAdminImages ,adminCtl.insertAdminData);

route.get('/view-admin', adminCtl.viewAdmin);

route.get('/deleteAdmin/:_id', adminCtl.deleteAdmin);

route.get('/updateAdmin/', adminCtl.updateAdmin);

route.post('/editAdminData/:id',Admin.uploadAdminImages,adminCtl.editAdminData);

module.exports = route;