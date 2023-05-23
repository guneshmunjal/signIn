const mongoose=require("mongoose");

require("dotenv").config();

const dbconnect =()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewurlParser:true,
        useunifiedTopology:true,
    
    })
    .then(()=> console.log("DB is connected successfully"))
    .catch(()=>{
        return console.log("issue in db connection");
        process.exit(1);
    });
}

module.exports=dbconnect;

