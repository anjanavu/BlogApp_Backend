const express=require('express');
const path = require('path');
const router=express.Router()
const signdata=require('../model/register');
router.use(express.json());
router.use(express.urlencoded({extended:true}))
const jwt = require('jsonwebtoken');



function verifytoken(req, res, next) {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      throw 'Unauthorized';
    }

    let payload = jwt.verify(token, 'reactblogapp');

    if (!payload) {
      throw 'Unauthorized';
    }

    next();
  } catch (error) {
    console.error('Error during token verification:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
}

//CRUD for Signup data


  router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const foundUser = await signdata.findOne({ email, password });
        const userid = foundUser ? foundUser._id : null;
         console.log(userid);
        if (foundUser) {
           let payload ={email:email,password:password};
           let token = jwt.sign(payload,'reactblogapp');

            res.status(200).send({message:'success',token:token,userid:userid});
          
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({error:"int"});
    }
});






  
router.post('/blogdata', async (req, res) => {
    const data = new signdata({
         name: req.body.name,
        email: req.body.email,
        address :req.body.address,
        phonenumber :req.body.phonenumber,
        password:req.body.password
    })
  
    try {
        const dataToSave = await data.save();
        res.status(200).send("Posted Successfully")
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
  })
  
  router.put("/blogdata/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updateddata = req.body;
      const result = await signdata.findByIdAndUpdate(id, updateddata, { new: true });
      res.status(200).json(result); // Respond with the updated user data
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).send(error);
    }
  });

router.delete('/blogdata/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const data = await signdata.findByIdAndDelete(id);
      res.json(`Document with ${data.name} has been deleted..`);
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})



router.get('/get/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await signdata.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports=router;