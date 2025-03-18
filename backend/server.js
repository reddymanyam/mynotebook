const express = require("express");
const dotenv = require("dotenv");
const app = express();
const User = require('./models/User');

app.use(express.json);

app.get('/notes', async(req,res)=>{
    
    try{
        const notes = await User.find({});
        res.status(200).send(notes)
    }catch(err){
         res.status(400).send("something went wrong");
    }
})

app.post('/notes', async(req,res)=>{
    try{
        const notes = new User(req.body);
        await notes.save();
        console.log("Data saved successfully:", user);
        res.status(201).send("Data saved successfully");
    }catch(err){
        res.status(400).send("something went wrong")
    }
})

app.patch('/notes', async(req,res)=>{
    
})

app.delete('/notes', async(req,res)=>{
    
})


const PORT = process.env.PORT || 7777;
app.listen(PORT, (req,res) =>{
    console.log(`Server is running at port ${PORT}`);
})