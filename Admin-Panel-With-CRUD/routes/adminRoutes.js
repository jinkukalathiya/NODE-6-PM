const express = require('express');

const route = express.Router();

console.log("Routing..");

const adminCtl = require('../controllers/adminController');

route.get('/', adminCtl.dashboard);

route.get('/add-admin', adminCtl.addAdmin);

module.exports = route;