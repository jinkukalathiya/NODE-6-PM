const express = require('express');

const route = express.Router();

const authCtl = require('../controllers/authController');

const authMiddleWare = require('../middleware/authMiddleware');

const role = require('../middleware/roleMiddleware');

route.get('/login',authCtl.showLogin);

route.post('/login',authCtl.doLogin);

route.get('/signup',authCtl.showSignUp);

route.post('/signup',authCtl.doSignUp);

route.get('/admin/adminDashboard', authMiddleWare, role.isAdmin, authCtl.adminDashboard);

route.get('/users/userDashboard', authMiddleWare, role.isUser, authCtl.userDashboard);

route.get('/logOut',authCtl.logout);

module.exports = route;