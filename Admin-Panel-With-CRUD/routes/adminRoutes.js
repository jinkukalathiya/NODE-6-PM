const express = require('express');

const route = express.Router();

console.log("Routing..");

const adminCtl = require('../controllers/adminController');

const Admin = require('../models/Admin');

route.get('/', adminCtl.login);

route.get('/dashboard', adminCtl.dashboard);

route.get('/add-admin', adminCtl.addAdmin);

route.post('/insertAdminData',Admin.uploadAdminImages ,adminCtl.insertAdminData);

route.get('/view-admin', adminCtl.viewAdmin);

route.get('/deleteAdmin/:_id', adminCtl.deleteAdmin);

route.get('/updateAdmin/', adminCtl.updateAdmin);

route.post('/editAdminData/:id',Admin.uploadAdminImages,adminCtl.editAdminData);

module.exports = route;