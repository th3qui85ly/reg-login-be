const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = process.env.PORT || 1912;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(`mongodb+srv://admin:admin1912@cluster0.lewmd.mongodb.net/loginDb?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String
})

const User = new mongoose.model("User", userSchema)

//routes routes
app.post("/login",(req,res)=>{
    const {email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
           if(password === user.password){
               res.send({message:"Logged In!",user:user})
           }else{
               res.send({message:"Invalid credentials! try again!"})
           }
        }else{
            res.send("User not found!")
        }
    })
});

app.post("/register",(req,res)=>{
    console.log(req.body) 
    const {name,email,phone,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"User already exist"})
        }else {
            const user = new User({name,email,phone,password})
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"User registered!"})
                }
            })
        }
    })
}) 

app.listen(PORT,()=>{
    console.log(`Server started at port 1912`)
})