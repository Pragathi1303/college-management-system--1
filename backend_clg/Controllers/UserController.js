const User=require("../Models/UserModel");

const SignupUser= async(req,res)=>{
    try{
        const {firstname,lastname,email,phone,password}= req.body;
        const NewUser = new User{{
            firstname,
            lastname,
            email,
            phone,
            password
        }};

        const SavedUser = await NewUser.save();
        res.status(200).json({
            message:"User registered successfully",
            data:SavedUser,

        })
     }
     catch(error){
        res.status(404).json({
            message:"User registration failed",
            error:error.message,
        });
     }
};
module.exports={
    SignupUser
}