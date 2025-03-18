const express = require("express");

const app = express();
const User = require('./models/User');






app.listen(7777, (req,res) =>{
    console.log("the server is running at port:7777");
})