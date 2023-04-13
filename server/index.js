const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./models/User')
const port = 4000
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser');

//keys
const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';


const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true,origin:'http://localhost:3000'}));


// Add your own
mongoose.connect('Please Add your own')


//localhost:4000/signup
app.post('/signup', async (req,res) => {
    const {name,email,password} = req.body;
    try{
      const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password,salt),
      });
      await userDoc.save()
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  });


  // localhost:4000/login
  app.post('/login', async (req,res) => {
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // logged in
      jwt.sign({email,id:userDoc._id}, secret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id:userDoc._id,
          email,
        });
      });
    } else {
      res.status(400).json('wrong credentials');
    }
  });

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})