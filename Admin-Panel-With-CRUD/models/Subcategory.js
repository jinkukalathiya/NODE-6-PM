const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
    sname : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : 'Active'
    },
    catagoryID:{
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    }
}, {
    timestamps : true
});

const Subcategory = mongoose.model('Subcategory',SubcategorySchema);

module.exports = Subcategory;