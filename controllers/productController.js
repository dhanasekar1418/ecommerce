const Product = require("../models/productModel");
const { v4: uuidv4 } = require('uuid');

exports.getProducts = async (req, res)=>{
    try{
        const products = await Product.find()
        res.send(products);
    }
    catch (err){
        console.error(err);
    }
};

 exports.createProduct = async(req,res)=>{
    try{
        const { title, description, price, category, rating, image } = req.body;
    const product = new Product({
        id: uuidv4(),
        title,
        description,
        price,
        category,
        rating,
        image,
    });
    await product.save();
    res.status(200).json("Product created successfully")
    }
    catch(err){
        console.log(err);
        res.status(500).send('Server error');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOneAndDelete({id});

        if (!product) {
            return res.status(404).json('Product not found');
        }

        res.status(200).json('Product deleted successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, category, rating, image } = req.body;
        const product = await Product.findByIdAndUpdate(id, {
            title,
            description,
            price,
            category,
            rating,
            image
        }, { new: true });

        if (!product) {
            return res.status(404).json('Product not found');
        }

        res.status(200).json('Product updated successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

exports.patchProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const product = await Product.findByIdAndUpdate(id, updates, { new: true });

        if (!product) {
            return res.status(404).json('Product not found');
        }

        res.status(200).json('Product updated successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};