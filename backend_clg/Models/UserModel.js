const mongoose=require("mongoose");

const UserScheme=new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    phone:String,
    password:String,
    role:"user",
});

module.exports=mongoose.Model("User",UserSchema);