const express = require('express');

const route = express.Router();

console.log("Sub Category Routing..");

const passport = require('passport');

const subcategoryCtl = require('../controllers/subCategoryController');

route.get('/add-subcategory',passport.checkAuthentication, subcategoryCtl.addSubCategory);

route.post('/insertSubCategory',passport.checkAuthentication, subcategoryCtl.insertSubCategory);

// route.get('/view-category',passport.checkAuthentication, categoryCtl.viewCategory);

module.exports = route;