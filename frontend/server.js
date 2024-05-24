const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//const no = require("nodemon")
app.use(express.json());
app.use(cors());

const mongoUrl = "mongodb+srv://dhruvdornal:vsZJmvTe3pJ2wcAG@cluster0.ngxrpuo.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoUrl,{
}).then(()=>{
    console.log("connected");
}).catch((e)=>console.log(e));

require("./userDetails")
const User = mongoose.model("users");

/* SIGNUP */
app.post('/register', async(req, res) => { 
    /* MONGO CODE */
const username = req.body.username;
const techstacks = req.body.techstacks;
const desc = req.body.desc;
const password = req.body.password; 
const hashPass = await bcrypt.hash(password,8);
const email = req.body.email;
const github = req.body.github;
const languages = req.body.languages;
const frameworks = req.body.frameworks;

if(password.length < 8){ 
    return res.status(400).send({ status: 'error', message: 'Password must be atleast 8 characters long' });
}
if(!username || !techstacks || !desc || !password || !email || !github || !languages || !frameworks){
    return res.status(400).send({ status: 'error', message: 'Please input all fields' });
}
    try{
        const old = await User.findOne({username})
        if(old){
            return res.status(400).send({ status: 'error', message: 'Oops, username taken' });
        }
        await User.create({
            username,password:hashPass,techstacks,languages,frameworks,desc,email,github //creating user in mongo
        })
        res.send({status:"ok"})
    }catch(error){
        res.send({status:"error"})
    }
})

/* LOGIN */
// app.post('/login', async(req, res) => {  
// const username = req.body.username;                 
// const password = req.body.password; 

// try{
//     const use = await User.findOne({username});
//     if(use && bcrypt.compareSync(password,use.password)){
//         res.send({status:"ok",username:use.username})
//     }else{
//         res.send({status:"invalid creds"})
//     }
// }catch(error){
//     res.send({status:"error",message:error.message})
// }
// })

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });  // finding user in db ha
  
      if (user && bcrypt.compareSync(password, user.password)) { // idhr user ka password check hoga in db if matches then login 
        console.log(user);
        const userDetails = {
          username: user.username,
          techstacks: user.techstacks,
          desc: user.desc,
          github: user.github,
          email: user.email
      };
        res.status(200).json({ status: "ok", user:userDetails});
      } else {
        res.status(401).json({ status: "error", message: "Invalid credentials" });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });


// app.post('/userprof',async(req,res)=>{
//     try{
//         const userID = req.userID;
//         const user = await User.findById(userID);
//         if(!user){
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json({
//             username: user.username,
//             email: user.email,
//             techstacks: user.techstacks,
//             desc: user.desc,
//             github: user.github
//         })
//     }catch(error){
//         console.error('Error fetching user profile:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })




// TO DISPLAY ALL USERS LIST
  // app.get('/users', async(req, res) => {
  //   // const techstack = req.params.techstack.split(',');
  //   // console.log('Request query:', req.query); 
  //   const techstacks = req.query.techstacks ? req.query.techstacks.split(',') : [];
  //   console.log('Recieved techstacks:', techstacks);
  //   try{

  //     if (techstacks.length > 0) {
  //       console.log('Executing query with techstacks:', techstacks);
  //       const users = await User.find({ techstacks: { $in: techstacks } });
  //       //console.log('Query result:', users);
  //       res.json(users);
  //     } else {
  //       res.json([]);
  //     }
  //   }catch(error){
  //       console.error("Error executing query: ",error);
  //       res.status(500).json({ message: error.message });
  //   }
  // });

  app.get('/users', async(req, res) => {
    const techstacks = req.query.techstacks ? req.query.techstacks.split(',') : [];
    console.log('Recieved techstacks:', techstacks);
    try{
      if (techstacks.length > 0) {
        console.log('Executing query with techstacks:', techstacks);
        const users = await User.find({ techstacks: { $in: techstacks } });
        console.log('Query result:', users);
        res.json(users);
      } else {
        // If no techstacks are provided, return all users
        const users = await User.find({});
        res.json(users);
      }
    }catch(error){
        console.error("Error executing query: ",error);
        res.status(500).json({ message: error.message });
    }
});

  // app.get('/users/:techstack', async(req, res) => {
  //   const techstack = req.params.techstack;
  //   try{
  //       const users = await User.find({techstacks: {$in: [techstack]}});
  //       console.log('Query result:', users);
  //       res.json(users);
  //   }catch(error){
  //       //console.error("Error executing query: ",error);
  //       res.status(500).json({ message: error.message });
  //   }  
  // });

  app.get('/users/:techstack?', async (req, res) => {
    try {
      let query = {};
      if (req.params.techstack) {
        query = { techstacks: req.params.techstack };
      }
      const users = await User.find(query);
      console.log('Query result:', users);
      res.json(users);
    } catch (error) {
      console.error("Error executing query: ", error);
      res.status(500).json({ message: error.message });
    }
  });


  app.get('/allusers', async (req, res) => {
    try {
      const users = await User.find({});
      //console.log('Fetched all users:', users);
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(5000,()=>{
    console.log("listening on 5000");
})
