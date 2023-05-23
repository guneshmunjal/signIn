const express=require("express");
const router = express.Router();

// import the controllers from respective controllers 
 const {signinup} = require("../controller/signup");
 const {login} = require("../controller/login");
// const {auth,isStudent} = require("../controller/middlewareAUTH");
const { middlewareAUTH,isStudent,isAdmin} = require("../middleware/middlewareAUTH");

// now you need to map the controllers to their respective routers
router.post("/signup",
signinup
);
router.post("/login",login);
router.get("/auth",middlewareAUTH,(req,res)=>{
    res.status(200).json({
        message:"you have entered the path successfully"
    })
})

router.get("/student",
 ()=>{middlewareAUTH,isStudent, (req,res) =>{
 res.status(200).json({
    message:"you have entered the student path successfully"
 })}
})

/*router.get("/admin",middlewareAUTH,isAdmin, (req,res) =>{
  res.status(200).json({
     message:"you have entered the admin path successfully"
  })
 })
*/
router.get("/admin", ()=>{
  middlewareAUTH,isAdmin,(req,res) =>{
    res.status(200).json({
      message:"you have entered the admin path"
    })
  }
})


module.exports=router;