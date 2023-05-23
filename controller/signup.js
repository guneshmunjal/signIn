const bcrypt = require("bcrypt");
const modelUser = require("../models/User");
const jwt = require("jsonwebtoken");
JWT_SECRET = "GUNESH";
require("dotenv").config();

// first of all get data from req
exports.signinup = async (req, res) => {
    try {
     const {name,password,email,role}= req.body;

// second get the email by using findone


      const checkuser = await modelUser.findOne({email});
       
      // now check whether that email is over there or not 

      if(checkuser){
        res.status(404).json({
            error:"email exits thus you need to login instead of signing up"
        
        });
      }
   
      // hash the password
      let hashedpassword;
      try{
        hashedpassword = await bcrypt.hash(password,10);

      }
      catch{
        res.status(404).json({
            error:"the password cannot be hashed try again later"
        });
       }


    // create the entry of user using create method in db 
    

      const user = await modelUser.create({
        email,password:hashedpassword,name,role
      })

      const token = jwt.sign({email:user.email,password:user.hashedpassword,id:user._id,role:user.role},process.env.JWT_SECRET)
     {
     return res.status(200).json({
        message:"user created successfully"
     });
    }

    } catch (err) {
      console.log(err)
        res.status(500).json({
            message: "signup is not successfull",
        });
    }
};





