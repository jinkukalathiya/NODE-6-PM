const express = require('express');

const route = express.Router();

console.log("Routing..");

const adminCtl = require('../controllers/adminController');

const Admin = require('../models/Admin');

route.get('/', adminCtl.dashboard);

route.get('/add-admin', adminCtl.addAdmin);

route.post('/insertAdminData',Admin.uploadAdminImages ,adminCtl.insertAdminData);

module.exports = route;