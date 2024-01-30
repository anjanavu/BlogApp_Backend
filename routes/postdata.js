const express = require('express');
const mongoose=require('mongoose');
const path=require('path');
const postdata = require('../model/post');
const signupdata=require('../model/register');
const router = express.Router()
const verifytoken=require('./signupdata');




//CRUD for post data
router.get("/", verifytoken, async (req, res) => {
  try {
      const getpost = await postdata.find().populate({
          path: 'user',
          model: 'signupdata',
          select: 'name', 
      });

      // Attach postId to each post
      const postsWithId = getpost.map(post => ({
          ...post._doc,
          postId: post._id.toString(), // Convert ObjectId to string
      }));

      res.json(postsWithId);
  } catch (error) {
      res.status(500).json({message: error.message})
  }
});



  // Retrieve a specific post by postId
router.get('/posts/:postId', verifytoken, async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await postdata
      .findById(postId)
      .populate({
        path: 'user',
        model: 'signupdata',
        select: 'name',
      });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


  
  router.post('/postdata', verifytoken, async (req, res) => {
    try {
        const userId = req.query.id;

        console.log(userId);

        const userData = await signupdata.findById(userId);

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        const postData = new postdata({
            title: req.body.title,
            description: req.body.description,
            imageurl: req.body.imageurl,
            user: userId,
        });

        const dataToSave = await postData.save();
        res.status(200).json({ message: 'Posted Successfully', postData: dataToSave });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
  
  


  
  router.put("/postdata/:id",verifytoken,async (req, res) => {
  try {
    const id = req.params.id;
  const updateddata = req.body;
  const result = await postdata.findByIdAndUpdate(id, updateddata);
   
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
  });
  



  
  router.delete('/postdata/:id', verifytoken,async (req, res) => {
  try {
      const id = req.params.id;
      const data = await postdata.findByIdAndDelete(id);
      res.json(`Document with ${data.title} has been deleted..`);
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
  })
module.exports=router;
  