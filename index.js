import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const collectionName = "usercollections";
    
mongoose.connect('mongodb://127.0.0.1:27017/CRUD');
app.use(express.json());
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies


const userSchema = new mongoose.Schema({
  name: String,
  age: String
});

const userModel = mongoose.model(collectionName, userSchema);


app.get("/getUsers", (req, res) => {
    console.log(req,res,'22222')
  userModel.find({})
    .then(function (users) {
        console.log(users,'users25')
      res.send(users);
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});
 
app.post("/addUser", (req, res) => {
    console.log(req.body,'3111')
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ error: "Name and age are required fields" });
  }

  const newUser = new userModel({ name, age });

  newUser.save()
    .then(function (user) {
      res.status(201).json(user);
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});




app.get("/getUsers", (req, res) =>{
    res.send("Data from backend")
})
app.get("/getData", (req, res) =>{
    res.send("Data from backend")
})

app.get("/fetch_Data", (req, res) =>{
    res.send("Fetched data from backend")
})

 app.listen(5001,()=> console.log("Server is running"))