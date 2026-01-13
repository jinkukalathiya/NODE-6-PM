const Category = require('../models/Category');
const SubCategory = require('../models/Subcategory');

const path = require('path');

const fs = require('fs');

const bcrypt = require('bcrypt');

const nodemailer = require("nodemailer");

const passport = require('passport');

module.exports.addSubCategory = async (req, res) => {
    try{
        // let adminData = await Admin.findById(req.user._id);
        let catagories = await Category.find();

        return res.render('add-subcategory', {
            adminData : req.user, catagories
        })
    }
    catch(err){
        console.log(err); 
        return res.redirect('/add-category');       
    }
}

module.exports.insertSubCategory = async (req, res) => {

    console.log("Req.body", req.body);
    
    try{
        let subcategoryData = await SubCategory.create(req.body);
        if(subcategoryData){
            req.flash('success',"Sub Category Inserted Successfully..!");
        }
        else{
            req.flash('error',"Error in Sub Category Insert..!");
        }
        return res.redirect('/subcategory/add-subcategory');
    }
    catch(err){
        console.log(err); 
        return res.redirect('/subcategory/add-subcategory');       
    }
}

module.exports.viewCategory = async (req, res) => {
    try{
        let categoryData = await Category.find({});
        // let categoryData = await Admin.find({});
        console.log(categoryData);
        return res.render('view-category', {
            categoryData,
            adminData : req.user
        })
    }
    catch(err){
        console.log(err);
        res.render('view-category', { adminData: [] });  
    }

}