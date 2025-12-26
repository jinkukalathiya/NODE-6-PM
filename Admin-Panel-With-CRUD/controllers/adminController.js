const Admin = require('../models/Admin');

const path = require('path');

const fs = require('fs');

const bcrypt = require('bcrypt');

module.exports.login = (req, res) => {
    try{
        return res.render('login');
    }
    catch(err){
        console.log(err);        
    }
}

module.exports.dashboard = (req, res) => {
    try{
        return res.render('dashboard');
    }
    catch(err){
        console.log(err);        
    }
}

module.exports.addAdmin = (req, res) => {
    try{
        return res.render('add-admin');
    }
    catch(err){
        console.log(err);        
    }
}

module.exports.insertAdminData = async(req, res) => {
    try{
        console.log(req.body);
        console.log(req.file);
        // const {fname, lname, email, password, gender, hobby, desc} = req.body;
        req.body.name = req.body.fname+" "+req.body.lname;
        req.body.avtar = '';
        if(req.file){
            req.body.avtar = Admin.adPath+"/"+req.file.filename;
        }
        let adminRecord = await Admin.create(req.body);
        if(adminRecord){
            console.log("Admin Record Inserted Successfully..");
            return res.redirect("/add-admin");
        }
        else{
            console.log("Error in Inserting Admin Record..");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);        
    }
}

module.exports.viewAdmin = async (req, res) => {
    try{
        let adminRecord = await Admin.find();
        if(adminRecord){
            return res.render('view-admin',{
                adminRecord
            });
        }
        else{
            return res.render('view-admin', []);
        }
    }
    catch(err){
        console.log(err);        
    }
}

module.exports.deleteAdmin = async (req, res) => {
    try{
        let adminId = req.params._id;
        let adminData = await Admin.findById(adminId);
        if(adminData){
            let imgPath = path.join(__dirname,"..",adminData.avtar);
            try{
                await fs.unlinkSync(imgPath);
            }
            catch(err){
                console.log(err);        
            }

            let deleteAdmin = await Admin.findByIdAndDelete(adminId);
            if(deleteAdmin){
                console.log("Admin Record Deleted Successfully..");
                return res.redirect('back');
            }
            else{
                console.log("Error in Deleting Admin Record..");
                return res.redirect('back');
            }
        }
        else{
            console.log(err);
        }
    }
    catch(err){
        console.log(err);        
    }
}

module.exports.updateAdmin = async (req, res) => {
    try{
        let adminId = req.query.adminId;
        let oldAdminData = await Admin.findById(adminId);
        if(oldAdminData){
            return res.render('edit-admin',{oldAdminData});
        }
        else{
            console.log("Record Not Found..");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);        
    }
}

module.exports.editAdminData = async (req, res) => {
    try{
        const adminId = req.params.id;
        let oldAdminData = await Admin.findById(adminId);
        if(oldAdminData){
            req.body.name = req.body.fname+" "+req.body.lname;
            req.body.avtar = '';
            if(req.file){
                req.body.avtar = Admin.adPath+"/"+req.file.filename;
            }
            else{
                req.body.avtar = req.file;
            }
            let newadminData = await Admin.findByIdAndUpdate(adminId,req.body);
            if(newadminData){
                console.log("Admin Record Updated Successfully..");
                return res.redirect("/view-admin");
            }
            else{
                console.log("Something Wrong..");
                return res.redirect('back');
            }
        }
        else{
            console.log("Record Not Found..");
            return res.redirect('back');
        }        
    }
    catch(err){
        console.log(err);        
    }
}