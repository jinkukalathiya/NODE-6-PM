const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const imagePath = "uploads/adminImages";

const AdminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    hobby : {
        type : Array,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    avtar : {
        type : String,
        required : true
    }
});

const adminStorage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname,"..",imagePath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+"-"+Date.now() + path.extname(file.originalname));
    }
});

AdminSchema.statics.uploadAdminImages = multer({
    storage: adminStorage
}).single('avtar');

AdminSchema.statics.adPath = imagePath;

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;