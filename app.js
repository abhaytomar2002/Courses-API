//npm 
const express = require("express");
const connect = require("./config/db");
const bodyParser = require("body-parser");
const app = express();

app.use (bodyParser.urlencoded({extended: true}));

//including controllers
const courseController = require("./controller/courseController");
app.use("/",courseController);

const userController = require("./controller/userController");
app.use("/user",userController);

//Declaring the port
app.listen(3000,async(req,res) => {

    try{
        await connect();
        console.log("listening port 3000")
    }
    catch(e){
        console.log(e.message) 
    }
})
