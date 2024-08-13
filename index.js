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


app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    users.push({ email, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(400).json({ error: 'User does not exist' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ email: user.email }, 'secretKey', { expiresIn: '1h' });

    res.status(200).json({ token });
});

// app.get('/',(req,res)=>{
//     res.send("Dhaush")
// })

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})