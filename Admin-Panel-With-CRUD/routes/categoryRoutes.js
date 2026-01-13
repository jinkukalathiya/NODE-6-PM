const express = require('express');

const route = express.Router();

console.log("Category Routing..");

const passport = require('passport');

const categoryCtl = require('../controllers/categoryController.js');

route.get('/add-category',passport.checkAuthentication, categoryCtl.addCategory);

route.post('/insertCategory',passport.checkAuthentication, categoryCtl.insertCategory);

route.get('/view-category',passport.checkAuthentication, categoryCtl.viewCategory);

module.exports = route;