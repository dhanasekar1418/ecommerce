const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userschema = new mongoose.Schema({
    id : {
        type: String,
        required: [true, "id is required"]
    },
    name: {
        type:String,
        required:[true, "Name is required"]
    },
    Email: {
        type:String,
        required:[true, "Email is required"],
        unique: true
    },
    Password: {
        type:String,
        required:[true, "Password is required"]
    }
})

userschema.pre("save",async function(next){
    if(!this.isModified("Password")){
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    next()
})

const User = new mongoose.model('User', userschema)
module.exports = User;