const Admin = require('../models/Admin');

const path = require('path');

const fs = require('fs');

const bcrypt = require('bcrypt');

const nodemailer = require("nodemailer");

const passport = require('passport');

module.exports.login = (req, res) => {
    try{
        if (req.cookies.admin) {
            return res.redirect('/dashboard');
        }
        else{
            return res.render('login');
        }
    }
    catch(err){
        console.log(err);      
        return res.redirect('/');   
    }
}

module.exports.signout = (req, res) => {
    try{
        res.clearCookie('admin');
        return res.redirect('/');
    }
    catch(err){
        console.log(err);    
        return res.redirect('/');
    }
}

module.exports.changePassword = async(req, res) => {
    try{
        // if(req.cookies.admin==undefined){
        //     return res.redirect('/');
        // }
        // else{
        //     let adminId = req.cookies.admin._id;
        //     let adminData = await Admin.findById(adminId);  
        //     if(adminData){
        //         let adminRecord = req.cookies.admin;
        //         return res.render('change-password',{
        //             adminRecord, adminData
        //         });
        //     }
        //     else{
        //         return res.redirect('/');
        //     }        
        // }

        let adminData = await Admin.findById(req.user._id);
        return res.render('change-password', {
            adminData
        })
    }
    catch(err){
        console.log(err);    
        return res.redirect('/');
    }
}

module.exports.checkChangePassword = async(req, res) => {
    try{
        let oldPass = req.user.password;
        let adminId = req.user._id;
        if(oldPass == req.body.currentPass){
            if(oldPass !== req.body.npassword){
                if(req.body.npassword == req.body.cpassword){
                    let adminData = await Admin.findByIdAndUpdate(adminId,{password : req.body.npassword});
                    if(adminData){
                        console.log("Password Change Successfully..");
                        return res.redirect('/signout');
                    }
                }
                else{
                    console.log("New Password and Confirm password not Same..");
                    return res.redirect('/');
                }
            }   
            else{
                console.log("Old Password and New Password Same..");
                return res.redirect('/');
            } 
        }
        else{
            console.log("Current Password Could not Match..");
            return res.redirect('/');
        }        
    }
    catch(err){
        console.log(err);    
        return res.redirect('/');
    }
}

module.exports.checkLogin = async (req, res) => {
    try{
        // console.log("Login Successfully");
        req.flash('success',"Login Successfully...!");
        return res.redirect('/dashboard');
    }
    catch(err){
        console.log("Something Wrong");
        return res.redirect("/");
    }
}

module.exports.profile = async (req, res) => {
    try{
        if(req.cookies.admin==undefined){
            return res.redirect('/');
        }
        else{
            let adminId = req.cookies.admin._id;
            let adminData = await Admin.findById(adminId);
            if(adminData){
                return res.render('profile', {
                    adminData
                });
            }
        }
    }
    catch(err){
        console.log(err);      
        return res.redirect('/');   
    }
}

module.exports.verifyEmail = async (req, res) => {
    try{
        return res.render('forgotPassword/viaEmail');
    }
    catch(err){
        console.log(err);      
        return res.redirect('/');   
    }
}

module.exports.checkEmail = async (req, res) => {
    try{
        console.log(req.body);
        let checkEmailId = await Admin.findOne({email:req.body.email});
        if(checkEmailId){
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // Use true for port 465, false for port 587
                auth: {
                    user: "rnw1webjinkal@gmail.com",
                    pass: "hrsjmjsdcyyfqllb",
                },
            });
            const OTP = Math.floor(Math.random()*999999)
            res.cookie("OTP",OTP);
            res.cookie('Email',req.body.email);
            const info = await transporter.sendMail({
                from: '<rnw1webjinkal@gmail.com>',
                to: req.body.email,
                subject: "OTP from Admin Panel",
                text: "Your OTP", // Plain-text version of the message
                html: `<b>Your OTP is : ${OTP} </b>`, // HTML version of the message
            });

            // console.log("Message sent:", info.messageId);

            if(info.messageId){
                console.log("Email Sent Successfully...");
                return res.redirect("/otpPage");
            }
            else{
                console.log("Email not Sent");      
                return res.redirect('/');
            }
        }
        else{
            console.log("Email I'D not Verify");      
            return res.redirect('/');
        }
    }
    catch(err){
        console.log(err);      
        return res.redirect('/');   
    }
}

module.exports.otpPage = (req, res) => {
    try{
        return res.render('forgotPassword/otpPage');
    }
    catch(err){
        console.log(err);      
        return res.redirect('/');   
    }
}

module.exports.verifyOTP = async(req, res) => {
    try{
        console.log("OTP : "+req.body.otp);
        console.log("developer : "+req.cookies.OTP);
        if(req.body.otp == req.cookies.OTP){
            return res.redirect("/newPassword")
        }
    }
    catch(err){
        console.log(err);      
        return res.redirect('back');   
    }
}

module.exports.newPassword = (req, res) => {
    try{
        return res.render('forgotPassword/newPassword');
    }
    catch(err){
        console.log(err);      
        return res.redirect('back');   
    }
}

module.exports.forgotPassword = async (req, res) => {
    try{
        console.log(req.body);
        let email = req.cookies.Email;
        if(req.body.npass == req.body.cpass){
            let checkEmail = await Admin.findOne({email : email});
            console.log(checkEmail);
            if(checkEmail){
                let updatedPassword = await Admin.findByIdAndUpdate(checkEmail.id,{password:req.body.npass});
                if(updatedPassword){
                    console.log("Password Updated Successfully..."); 
                    res.clearCookie("OTP");     
                    res.clearCookie("Email");     
                    return res.redirect('/signout');
                }
                else{
                    console.log("Password Not Updated");      
                    return res.redirect('back');
                }
            }
            else{
                console.log("Invalid Email I'D");      
                return res.redirect('/forgotPassword/viaEmail');
            }
        }
        else{
            console.log("New Password and Confirm Password Not Match...");
            return res.redirect('back'); 
        }
    }
    catch(err){
        console.log(err);      
        return res.redirect('/');   
    }
}

module.exports.dashboard = async (req, res) => {
    try{
        if(!req.isAuthenticated()){
            return res.redirect('/');
        }
        let adminData = req.user;
        return res.render('dashboard', { adminData });
    }
    catch(err){
        console.log(err);
        return res.redirect('/');       
    }
}

module.exports.addAdmin = async (req, res) => {
    try{
        let adminData = await Admin.findById(req.user._id);
        return res.render('add-admin', {
            adminData,
            adminRecord : adminData
        })
    }
    catch(err){
        console.log(err); 
        return res.redirect('/');       
    }
}

module.exports.insertAdminData = async(req, res) => {
    try{
        req.body.name = req.body.fname+" "+req.body.lname;
        req.body.avtar = '';
        if(req.file){
            req.body.avtar = req.file ? Admin.adPath + "/" + req.file.filename : '';
        }
        let adminRecord = await Admin.create(req.body);
        if(adminRecord){
            req.flash('success',"Admin Record Inserted Successfully..!");
            // console.log("Admin Record Inserted Successfully..");
            return res.redirect("/add-admin");
        }
        else{
            // console.log("Error in Inserting Admin Record..");
            req.flash('error',"Error in Inserting Admin Record..!");
            return res.redirect('/add-admin');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('/');        
    }
}

module.exports.viewAdmin = async (req, res) => {
    try{
        let adminData = await Admin.find({});
        console.log(adminData);
        return res.render('view-admin', {
            adminData : adminData
        })
    }
    catch(err){
        console.log(err);
        res.render('view-admin', { adminData: [] });  
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
                return res.redirect('/view-admin');
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
        return res.redirect('/');        
    }
}

module.exports.updateAdmin = async (req, res) => {
    try{
        if(req.cookies.admin==undefined){
            return res.redirect('/');
        }
        else{
            let adminId = req.cookies.admin._id;
            let adminData = await Admin.findById(adminId);
            if(adminData){
                let adminId = req.query.adminId;
                let oldAdminData = await Admin.findById(adminId);
                if(oldAdminData){
                    return res.render('edit-admin',{oldAdminData, adminData});
                }
                else{
                    console.log("Record Not Found..");
                    return res.redirect('back');
                }
            }
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('/');        
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
                if(oldAdminData.avtar){
                    let oldPath = path.join(__dirname,"..",oldAdminData.avtar);
                    fs.unlinkSync(oldPath);
                }
                req.body.avtar = Admin.adPath + "/" + req.file.filename;
            }
            else{
                req.body.avtar = oldAdminData.avtar;
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
        return res.redirect('/');        
    }
}