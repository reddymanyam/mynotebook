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
        console.log("Data saved successfully:", notes);
        res.status(201).send("Data saved successfully");
    }catch(err){
        res.status(400).send("something went wrong")
    }
})

app.patch('/notes/:id', async(req,res)=>{

    const notesId = req.body._id;
    try{
    const notes = User.findByIdAndUpdate(notesId);
    await notes.save();
    }catch(err){
        res.status(400).send("something went wrong...!");
    }
})

app.delete('/notes/:id', async(req,res)=>{

    const notesId = req.body._id;
    try{
        const notes = User.findByIdAndDelete(notesId);
        await notes.save();
    }catch(err){
       res.status(400).send("something went wrong...!");
    }
})


const PORT = process.env.PORT || 7777;
app.listen(PORT, (req,res) =>{
    console.log(`Server is running at port ${PORT}`);
})