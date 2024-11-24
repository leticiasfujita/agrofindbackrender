const express = require("express");
const mongoose = require('mongoose');
const app = express()
app.use(express.json())
const port = 3000

const cors = require("cors");
app.use(cors());
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  }; 
app.use(cors(corsOpts));

//mongo conection string
mongoose.connect('mongodb+srv://leticiasfujita:4hzsfOeBQK8R5KF4@cluster0.hsn9ybt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const UserModel = mongoose.model('users', userSchema);


app.get("/", async (req, res) => {
    const listUsers = await UserModel.find()
    return res.send(listUsers)
})

app.delete("/:id", async (req, res) => {
    const user = await UserModel.findByIdAndDelete(req.params.id)
    return res.send(user)

})

app.put("/:id", async (req, res) => {
    const user = await UserModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, { new: true })
    return res.send(user)

})

app.post("/", async (req, res) => {
    console.log(req);
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    await user.save()
    res.send(user)
})

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const userValidation = await UserModel.findOne({email});
    let match = false;
    if(userValidation){
        match = userValidation.password == password? true: false;
    } else {
        return false
    }
    return res.send(match)
})

const advertisingSchema = new mongoose.Schema({
    name: String,
    occupationArea: String,
    timeExperience: String,
    adress: String,
    contact: String,
    city: String,
    description: String,
    imageUrl: String,
    idUser: String,
});

const AdvertisingModel = mongoose.model('advertising', advertisingSchema);

app.get("/advertisiment", async (req, res) => {
    const listUsers = await AdvertisingModel.find()
    return res.send(listUsers)
})

app.post("/advertisiment", async (req, res) => {
    console.log(req);
    const advertisiment = new AdvertisingModel({
        name: req.body.name,
        occupationArea: req.body.occupationArea,
        timeExperience: req.body.timeExperience,
        adress: req.body.adress,
        contact: req.body.contact,
        city: req.body.city,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        idUser: req.body.idUser,
    })
    await advertisiment.save()
    res.send(advertisiment)
})

app.post("/myAdvertisiment", async (req, res) => {
    const idUser = req.body.idUser;
    console.log(idUser);
    const listUsers = await AdvertisingModel.find({idUser: idUser})
    console.log(listUsers);
    return res.send(listUsers)
})

app.listen(port, () => {
    console.log('App Running')
})



