const express = require('express');

const cors = require('cors');
const mongoose=require('mongoose');
const path=require('path');
const app=new express();

const signdata=require('./model/register');
const postdata = require('./model/post');
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'/build')));
require("./db/connect");

const signrouter=require('./routes/signupdata');
app.use('/sign',signrouter);

const postrouter=require('./routes/postdata');
app.use('/blog',postrouter);


app.get('/*',function(req,res){
  res.sendFile(path.join(__dirname,'/build/index.html'));
})

  
  const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})

