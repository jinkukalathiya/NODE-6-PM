const mongoose = require('mongoose');

const db = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/adminPanel");
        console.log("MongoDB Connected Successfully");
    }   
    catch(err){
        console.log("DB Error : ",err);
    }
}

module.exports = db;