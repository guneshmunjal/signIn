const bcrypt = require("bcrypt");
const userModel = require("../models/User");
const jwt = require("jsonwebtoken");

JWT_SECRET = "GUNESH";

require("dotenv").config();
exports.login = async (req, res) => {
  try {
    // first of all we need to get the email and password from the body
    const { email, password } = req.body;
    // second we need to check whether the user has entered correct email and password

   const existingUser = await userModel.findOne({ email: email });

    if (!existingUser) {
      return res.status(401).json({
        message: "the email and password that you have entered are incorrect",
      });
    }

    // if not then write that condition to send message for incorrect email and password

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(404).json({
        message: "the password you have entered is incorrect",
      
      });
    
    }
         const token = jwt.sign(
      { email: existingUser.email, password:matchPassword._id ,role:existingUser.role},
      JWT_SECRET,
      {
        expiresIn: "2d",
      }) 
     // existingUser = existingUser.toObject();
     console.log(existingUser);


       existingUser.token = token;

       console.log(existingUser);

        const options = {
        expiresIn:Date(Date.now() + 5*1000*60),
        httpOnly:true,
        
       }
       
       console.log(cookie);

    res.cookie("thirdCookie",token,options).status(200).json({
      token,
      success:true, 
      
    })

 

    // now compare the password using bcrypt method

    // you need to pass three things in cookie 1. is name of cookie ,2 data of cookie ,kuch options like its validity and expiridity
  }
  
  catch (error) {
    return res.status(400).json({
      error: error,
      message: `the error is ${error}`,
    });
  }

}