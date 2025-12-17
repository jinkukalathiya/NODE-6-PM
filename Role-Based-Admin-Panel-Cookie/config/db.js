const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/authentication");
        console.log("MongoDB Connected Successfully");
    }   
    catch(err){
        console.log("DB Error : ",err);
    }
}

module.exports = connectDB;