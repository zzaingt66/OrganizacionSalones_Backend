const mongoose = require('mongoose');

const sedeSchema= new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        unique:true,
        trim:true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('sede', sedeSchema);