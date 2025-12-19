// const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/adminPanel");

// const db = mongoose.connection;

// db.once('open', (err) => {
//     if(err){
//         console.log(err);
//         return false;        
//     }
//     console.log("DB Connected Successfully..");
// })

// module.exports = db;

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