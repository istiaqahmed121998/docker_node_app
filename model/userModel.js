const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true,"User id required"],
        unique:true
    },
    password:{
      type:String,
      select: false
    },
    author:{
        type:String,
        require:[true,"User password required"],
    }
});
const User = mongoose.model('User',userSchema);
module.exports = User;

