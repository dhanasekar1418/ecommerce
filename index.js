const express = require("express");
const app = express();
const cors = require('cors');

const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const mongoose = require ("mongoose");
app.use(express.json());
app.use(cors());

const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require('./routes/orderRoutes');

mongoose.connect(
    "mongodb+srv://dhanasekar:dhanasekar14@cluster0.ius73fo.mongodb.net/"
).then(()=>{
    console.log("connected to MongoDB");
})

app.use("/products",productRoutes);
app.use("/user",userRoutes);
app.use("/cart",cartRoutes);
app.use("/order",orderRoutes);

// app.get('/',(req,res)=>{
//     res.send("Dhaush")
// })

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})