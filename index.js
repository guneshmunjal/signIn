const express = require("express");
const app = express(); // instantion has been done 


const morgan = require('morgan')
app.use(morgan("dev"));

// now we need to import the models
require("dotenv").config;
const PORT = process.env.PORT || 4000;

// now using middleware to pass the data

app.use(express.json())

//mount
const user = require("./router/user");

app.use("/api/v1",user);

// connection with db
const connectwithdb = require ("./config/database");
connectwithdb();

// now to start the server

app.listen(PORT,()=>{
    console.log("the app is running successfully on port 4000");
});

app.get("/",(req,res)=>{
    res.send("this is homepage and is runnig successfuly");
})