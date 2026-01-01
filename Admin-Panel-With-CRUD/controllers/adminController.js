const Admin = require('../models/Admin');

const path = require('path');

const fs = require('fs');

const bcrypt = require('bcrypt');

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
        if(req.cookies.admin==undefined){
            return res.redirect('/');
        }
        else{
            let adminId = req.cookies.admin._id;
            let adminData = await Admin.findById(adminId);  
            if(adminData){
                let adminRecord = req.cookies.admin;
                return res.render('change-password',{
                    adminRecord, adminData
                });
            }
            else{
                return res.redirect('/');
            }        
        }
    }
    catch(err){
        console.log(err);    
        return res.redirect('/');
    }
}

module.exports.checkChangePassword = async(req, res) => {
    try{
        let oldPass = req.cookies.admin.password;
        let adminId = req.cookies.admin._id;
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
        let checkEmail = await Admin.findOne({email:req.body.email});
        if(checkEmail){
            if(checkEmail.password == req.body.password){
                console.log("Login Successfully");
                res.cookie('admin',checkEmail);
                return res.redirect('/dashboard');
            }
            else{
                console.log("Invalid Password");
                return res.redirect("/");
            }
        }
        else{
            console.log("Email I'D is Invalid");
            return res.redirect("/");       
        }
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

// module.exports.forgotPassword = (req, res) => {
//     try{
//         return res.redirect('/forgotPassword/viaEmail');
//     }
//     catch(err){
//         console.log(err);      
//         return res.redirect('/');   
//     }
// }

module.exports.dashboard = async (req, res) => {
    try{
        if(req.cookies.admin==undefined){
            return res.redirect('/');
        }
        else{
            let adminData = await Admin.findById(req.cookies.admin._id);
            return res.render('dashboard', { adminData });            
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('/');       
    }
}

module.exports.addAdmin = async (req, res) => {
    try{
        if(req.cookies.admin==undefined){
            return res.redirect('/');
        }
        else{
            let adminId = req.cookies.admin._id;
            let adminData = await Admin.findById(adminId);
            if(adminData){
                let adminRecord = req.cookies.admin;
                return res.render('add-admin',{
                    adminRecord, adminData
                });
            }
            else{
                return res.redirect('/');
            } 
        }
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
        return res.redirect('/');        
    }
}

module.exports.viewAdmin = async (req, res) => {
    try{
        if(req.cookies.admin==undefined){
            return res.redirect('/');
        }
        else{
            let adminId = req.cookies.admin._id;
            let adminData = await Admin.findById(adminId);
            if(adminData){
                let adminRecord = await Admin.find();
                if(adminRecord){
                    return res.render('view-admin', {
                        adminRecord, adminData
                    })
                }
            }            
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('/');        
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